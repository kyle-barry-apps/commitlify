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

  const { setModal } = useContext(ModalContext);

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
      {user && <h1 className="dashboard-welcome">My Dashboard</h1>}
      <section
        className={
          commitments.length > 0
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
            {commitments.map((c) => {
              return <CommitmentItem commitment={c} key={c._id} />;
            })}
          </>
        )}
      </section>
    </>
  );
};

export default Dashboard;
