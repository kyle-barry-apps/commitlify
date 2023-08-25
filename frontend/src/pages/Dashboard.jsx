import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ModalContext } from "../contexts/modalContext";
import AddCommitment from "../modals/addCommitment";
import { getCommitments, reset } from "../features/commitment/commitmentSlice";
import Spinner from "../components/Spinner";

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
        {commitments.map((c, index) => {
          return <div key={index}>{c.name}</div>;
        })}
        {/* {commitments.length === 0 ? (
          <div className="commitment-container">
            <button
              onClick={() => setModal("addCommitment")}
              className="btn btn-commitment"
            >
              Add Commitment
            </button>
          </div>
        ) : (
          <div className="commitment-container">
            {commitments.map((c) => {
              return <div>c.name</div>;
            })}
          </div>
        )} */}
      </section>
    </>
  );
};

export default Dashboard;
