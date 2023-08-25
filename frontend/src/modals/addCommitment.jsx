// import "./modals.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCommitment } from "../features/commitment/commitmentSlice";

const AddCommitment = () => {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createCommitment({ name }));
    setName("");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <input
          className="form-control"
          type="text"
          name="name"
          id="name"
          placeholder="Commitment title"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn btn-create" type="submit">
          Create new commitment
        </button>
      </form>
    </div>
  );
};

export default AddCommitment;
