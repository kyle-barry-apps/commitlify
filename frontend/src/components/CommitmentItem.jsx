import { deleteCommitment } from "../features/commitment/commitmentSlice";
import { useDispatch } from "react-redux";

const CommitmentItem = ({ commitment }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{commitment.name}</h1>
      <button onClick={() => dispatch(deleteCommitment(commitment._id))}>
        X
      </button>
    </div>
  );
};

export default CommitmentItem;
