// import "./modals.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddCommitment = () => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  console.log(name);

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
