import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ModalContext } from "../contexts/modalContext";
import AddCommitment from "../modals/addCommitment";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { modal, setModal } = useContext(ModalContext);

  const { user } = useSelector((state) => state.user);
  const { commitments, isLoading } = useSelector((state) => state.commitments);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <section className="dashboard-container">
        <AddCommitment />
        {commitments.map((c) => {
          return <div>c.name</div>;
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
