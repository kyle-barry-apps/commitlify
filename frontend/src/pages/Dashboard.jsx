import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ModalContext } from "../contexts/modalContext";
import { getCommitments, reset } from "../features/commitment/commitmentSlice";
import Spinner from "../components/Spinner";
import CommitmentItem from "../components/Commitment/CommitmentItem";
import { AiOutlinePlus } from "react-icons/ai";

import "./dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [menu, setMenu] = useState("current");

  const { setModal } = useContext(ModalContext);

  const { user } = useSelector((state) => state.user);
  const { commitments, isLoading, isError, message } = useSelector(
    (state) => state.commitments
  );

  const completedCommitments = commitments.filter(
    (c) => c.isCompleted === true
  );
  const currentCommitments = commitments.filter((c) => c.isCompleted !== true);

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
      {user && <h1 className="dashboard-welcome">My Dashboard</h1>}
      {commitments.length > 0 && (
        <div className="commitment-menu">
          <div
            onClick={() => setMenu("current")}
            className={
              menu === "current"
                ? "current-commitments active"
                : "current-commitments"
            }
          >
            Current Commitments
          </div>
          <div
            onClick={() => setMenu("completed")}
            className={
              menu === "completed"
                ? "completed-commitments active"
                : "completed-commitments"
            }
          >
            Completed Commitments
          </div>
        </div>
      )}
      <section
        className={
          commitments.length === 0
            ? "dashboard-container"
            : currentCommitments.length > 0 && menu === "current"
            ? "dashboard-container active"
            : menu === "completed" && completedCommitments > 0
            ? "dashboard-container active"
            : "dashboard-container"
        }
      >
        {commitments.length === 0 ? (
          <div className="empty-dashboard">
            <h3>Get started by adding a commitment</h3>
            <button
              className="btn btn-create"
              onClick={() => setModal("addCommitment")}
            >
              Create Commitment
            </button>
          </div>
        ) : (
          <>
            <div className="add-icon" onClick={() => setModal("addCommitment")}>
              <AiOutlinePlus size={30} color="white" />
            </div>
            {menu === "current" ? (
              currentCommitments.map((c) => {
                return <CommitmentItem commitment={c} key={c._id} />;
              })
            ) : menu === "completed" && completedCommitments.length > 0 ? (
              completedCommitments.map((c) => {
                return <CommitmentItem commitment={c} key={c._id} />;
              })
            ) : (
              <div className="empty-dashboard">
                <h3>You haven't completed any commitments yet</h3>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default Dashboard;
