import { useContext } from "react";
import { useDispatch } from "react-redux";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { ModalContext } from "../../contexts/modalContext";
import { CommitmentContext } from "../../contexts/commitmentContext";
import { updateCommitment } from "../../features/commitment/commitmentSlice";
import { AiOutlineCheck } from "react-icons/ai";
import "react-circular-progressbar/dist/styles.css";
import "./commitmentItem.css";

const CommitmentItem = ({ commitment }) => {
  const { setModal } = useContext(ModalContext);
  const { setActiveCommitment } = useContext(CommitmentContext);
  const dispatch = useDispatch();

  const percentage = 66;

  const commitmentStatement = () => {
    let statement = "";

    if (commitment.commitmentType.timeframe === "one-time") {
      statement = "One time commitment";
    } else if (commitment.commitmentType.timeframe === "weekly") {
      statement = `${commitment.commitmentType.numberOfDays} days per week`;
    } else if (commitment.commitmentType.timeframe === "monthly") {
      statement = `${commitment.commitmentType.numberOfDays} days per month`;
    } else {
      statement = `Daily commitment`;
    }

    return statement;
  };

  const toggleCompletion = () => {
    const today = new Date().toDateString();
    let updatedCommitment = { ...commitment };

    if (updatedCommitment.completionDates.includes(today)) {
      updatedCommitment = {
        ...updatedCommitment,
        completionDates: updatedCommitment.completionDates.filter(
          (c) => c !== today
        ),
      };
    } else {
      updatedCommitment = {
        ...updatedCommitment,
        completionDates: [...updatedCommitment.completionDates, today],
      };
    }

    dispatch(
      updateCommitment({
        id: updatedCommitment._id,
        commitmentData: updatedCommitment,
      })
    );
  };

  return (
    <div
      className="commitment"
      onClick={() => {
        setActiveCommitment(commitment);
        setModal("viewCommitment");
      }}
    >
      <h1 className="commitment-title">{commitment.name}</h1>
      <div className="daily-completion" onClick={toggleCompletion}>
        <AiOutlineCheck size={60} style={{ color: "#c0262c" }} />
      </div>

      {/* <div className="progress-container">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            pathColor: "#f9383b",
            backgroundColor: "#c0262c",
            textColor: "rgb(0,0,0)",
            textSize: "20px",
            trailColor: "#d6d6d6",
            strokeLinecap: "butt",
          })}
        />
      </div> */}
      <div className="commitment-statement">{commitmentStatement()}</div>
      <div className="pledges-container">
        <div className="commitment-pledge">
          Pledge Amount: ${commitment.moneyCommitted}
        </div>
      </div>
    </div>
  );
};

export default CommitmentItem;
