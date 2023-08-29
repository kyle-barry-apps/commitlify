import { useContext } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { ModalContext } from "../../contexts/modalContext";
import { CommitmentContext } from "../../contexts/commitmentContext";
import "react-circular-progressbar/dist/styles.css";
import "./commitmentItem.css";

const CommitmentItem = ({ commitment }) => {
  const { setModal } = useContext(ModalContext);
  const { setActiveCommitment } = useContext(CommitmentContext);

  const percentage = 66;

  return (
    <div
      className="commitment"
      onClick={() => {
        setActiveCommitment(commitment);
        setModal("viewCommitment");
      }}
    >
      <h1 className="commitment-title">{commitment.name}</h1>

      <div className="progress-container">
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
      </div>
      <div className="pledges-container">
        <div className="commitment-pledge">
          Amount pledged: ${commitment.moneyCommitted}
        </div>
        {commitment.commitmentType !== "one-time" && (
          <div className="time-pledge">
            Time pledged:{" "}
            {commitment.commitmentType === "daily"
              ? `${commitment.timeCommitted} minutes per day`
              : commitment.commitmentType === "weekly"
              ? `${commitment.timeCommitted} minutes per week`
              : commitment.commitmentType === "monthly"
              ? `${commitment.timeCommitted} minutes per month`
              : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommitmentItem;
