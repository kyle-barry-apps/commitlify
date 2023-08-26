import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ModalContext } from "../contexts/modalContext";
import AddCommitment from "../modals/addCommitment";
import { getCommitments, reset } from "../features/commitment/commitmentSlice";
import Spinner from "../components/Spinner";
import CommitmentItem from "../components/CommitmentItem";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { modal, setModal } = useContext(ModalContext);

  const { user } = useSelector((state) => state.user);
  const { commitments, isLoading, isError, message } = useSelector(
    (state) => state.commitments
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getCommitments());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="dashboard-container">
        <AddCommitment />

        {commitments.length > 0 &&
          commitments.map((c) => {
            return <CommitmentItem commitment={c} key={c._id} />;
          })}
      </section>
    </>
  );
};

export default Dashboard;
