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

  const { modal, setModal } = useContext(ModalContext);

  const dispatch = useDispatch();
  const modal_ref = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createCommitment({ name, description, moneyCommitted: pledgeAmount })
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
            defaultValue={20}
            onChange={(e) => setPledgeAmount(e.target.value)}
            min={1}
            max={10000}
          />
        </div>
        <button className="btn btn-create" type="submit">
          Create commitment
        </button>
      </form>
    </div>
  );
};

export default AddCommitment;
