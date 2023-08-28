import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./commitmentItem.css";

const CommitmentItem = ({ commitment }) => {
  const percentage = 66;
  return (
    <div className="commitment">
      <h1 className="commitment-title">{commitment.name}</h1>
      <div className="progress-container">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            pathColor: "#c0262c",
            backgroundColor: "#c0262c",
            textColor: "rgb(0,0,0)",
            textSize: "20px",
            trailColor: "#d6d6d6",
          })}
        />
      </div>
      <div className="commitment-pledge">
        Amount pledged: ${commitment.moneyCommitted}
      </div>
    </div>
  );
};

export default CommitmentItem;
