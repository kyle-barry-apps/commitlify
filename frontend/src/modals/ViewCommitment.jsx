import { useContext } from "react";
import { CommitmentContext } from "../contexts/commitmentContext";

const ViewCommitment = () => {
  const { activeCommitment, setActiveCommitment } =
    useContext(CommitmentContext);

  console.log(activeCommitment);
  return <div className="modal-container"></div>;
};

export default ViewCommitment;
