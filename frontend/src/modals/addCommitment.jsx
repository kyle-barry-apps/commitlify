// import "./modals.css";
import { useState, useRef, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { createCommitment } from "../features/commitment/commitmentSlice";
import { ModalContext } from "../contexts/modalContext";

import "./modals.css";

const AddCommitment = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pledgeAmount, setPledgeAmount] = useState(20);
  const [commitmentType, setCommitmentType] = useState("one-time");
  const [timeCommitted, setTimeCommitted] = useState(0);

  const { modal, setModal } = useContext(ModalContext);

  const dispatch = useDispatch();
  const modal_ref = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createCommitment({
        name,
        description,
        moneyCommitted: pledgeAmount,
        commitmentType,
        timeCommitted,
      })
    );
    setName("");
    setModal("");
  };

  useEffect(() => {
    const handler = (e) => {
      if (!modal_ref.current.contains(e.target)) {
        setModal("");
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [modal, setModal]);

  return (
    <div className="modal-container" ref={modal_ref}>
      <form onSubmit={handleSubmit} className="addCommitment-form">
        <h1 className="modal-title">Add Commitment</h1>
        <div className="modal-group">
          <label htmlFor="name">Title</label>
          <input
            className="form-control"
            type="text"
            name="name"
            id="name"
            value={name}
            placeholder="e.g. Meditate"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="modal-group">
          <label htmlFor="description">Description</label>
          <textarea
            placeholder="e.g. I want to meditate for 10 minutes every day"
            className="form-control"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="modal-group">
          <label htmlFor="pledge-amount">Pledge Amount (USD $)</label>
          <input
            type="number"
            className="form-control pledge-amount"
            name="pledge-amount"
            defaultValue={20}
            onChange={(e) => setPledgeAmount(e.target.value)}
            min={1}
            max={10000}
          />
        </div>
        <label htmlFor="commitment-type">Commitment Type</label>
        <div className="commitment-type-container">
          <div
            className={
              commitmentType === "one-time"
                ? "commitment-type active"
                : "commitment-type"
            }
            onClick={() => setCommitmentType("one-time")}
          >
            One-Time
          </div>
          <div
            className={
              commitmentType === "daily"
                ? "commitment-type active"
                : "commitment-type"
            }
            onClick={() => setCommitmentType("daily")}
          >
            Daily
          </div>
          <div
            className={
              commitmentType === "weekly"
                ? "commitment-type active"
                : "commitment-type"
            }
            onClick={() => setCommitmentType("weekly")}
          >
            Weekly
          </div>
          <div
            className={
              commitmentType === "monthly"
                ? "commitment-type active"
                : "commitment-type"
            }
            onClick={() => setCommitmentType("monthly")}
          >
            Monthly
          </div>
        </div>
        <div className="modal-group">
          {commitmentType == "daily" ? (
            <label htmlFor="time-pledge">Minutes per day</label>
          ) : commitmentType === "weekly" ? (
            <label htmlFor="time-pledge">Minutes per week</label>
          ) : commitmentType === "monthly" ? (
            <label htmlFor="time-pledge">Minutes per month</label>
          ) : null}
          {commitmentType !== "one-time" && (
            <input
              type="number"
              name="time-pledge"
              className="form-control pledge-amount"
              defaultValue={30}
              onChange={(e) => setTimeCommitted(e.target.value)}
              min={1}
              max={10000}
            />
          )}
        </div>
        <button className="btn btn-create" type="submit">
          Create commitment
        </button>
      </form>
    </div>
  );
};

export default AddCommitment;
