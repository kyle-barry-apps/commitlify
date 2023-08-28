// import "./modals.css";
import { useState, useRef, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { createCommitment } from "../features/commitment/commitmentSlice";
import { ModalContext } from "../contexts/modalContext";
import "./modals.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddCommitment = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState(new Date());

  const { modal, setModal } = useContext(ModalContext);

  const dispatch = useDispatch();
  const modal_ref = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createCommitment({ name }));
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
            placeholder="e.g. Write a novel"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="modal-group">
          <label htmlFor="description">Description</label>
          <textarea
            placeholder="e.g. I want to write a novel about committing to writing a novel"
            className="form-control"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="modal-group">
          <label htmlFor="endDate">End Date</label>
          <DatePicker
            className="form-control"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </div>

        <button className="btn btn-create" type="submit">
          Create new commitment
        </button>
      </form>
    </div>
  );
};

export default AddCommitment;
