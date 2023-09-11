import { useContext, useEffect, useState } from "react";
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
  const [streak, setStreak] = useState();
  const [percentageComplete, setPercentageComplete] = useState(0);
  const dispatch = useDispatch();

  console.log(percentageComplete);

  useEffect(() => {
    function getCurrentWeekDays() {
      const today = new Date();
      const currentDay = today.getDay(); // 0 (Sunday) to 6 (Saturday)
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - currentDay); // Start from Sunday
      const days = [];

      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        days.push(currentDate.toDateString());
      }

      return days;
    }

    const convertedDates = {
      0: "Sunday",
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
    };

    const today = new Date().toDateString();
    const todayDay = new Date().getDay();

    if (
      commitment.commitmentType.timeframe === "daily" &&
      commitment.commitmentType.daysOfWeek.includes(convertedDates[todayDay]) &&
      commitment.completionDates.includes(today)
    ) {
      setPercentageComplete(100);
    } else if (commitment.commitmentType.timeframe === "weekly") {
      const currentWeekDays = getCurrentWeekDays();

      const daysCompleted = currentWeekDays.reduce((acc, curr) => {
        if (commitment.completionDates.includes(curr)) {
          acc += 1;
        }
        return acc;
      }, 0);

      const percentage = daysCompleted / commitment.commitmentType.numberOfDays;
      percentage >= 1
        ? setPercentageComplete(1)
        : setPercentageComplete(percentage);
    }
  }, [percentageComplete, commitment]);

  const commitmentStatement = () => {
    let statement = "";

    if (commitment.commitmentType.timeframe === "weekly") {
      statement = `${commitment.commitmentType.numberOfDays} days per week`;
    } else {
      statement = `Daily commitment`;
    }

    return statement;
  };

  const toggleCompletion = (event) => {
    event.stopPropagation();

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
      className={
        percentageComplete === 100 ? "commitment complete" : "commitment"
      }
      onClick={() => {
        setActiveCommitment(commitment);
        setModal("viewCommitment");
      }}
    >
      <h1 className="commitment-title">{commitment.name}</h1>
      <div
        className="daily-completion"
        style={{ "--percentageComplete": percentageComplete }}
        onClick={toggleCompletion}
      >
        <AiOutlineCheck size={60} style={{ color: "#c0262c" }} />
      </div>
      <div className="commitment-statement">{commitmentStatement()}</div>
      <div className="pledges-container">
        <div className="commitment-pledge">
          Pledge: ${commitment.moneyCommitted}
        </div>
      </div>
    </div>
  );
};

export default CommitmentItem;
