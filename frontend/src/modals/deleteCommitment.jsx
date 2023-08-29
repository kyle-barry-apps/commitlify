import { useContext, useRef, useEffect } from "react";
import { CommitmentContext } from "../contexts/commitmentContext";
import { ModalContext } from "../contexts/modalContext";
import { useDispatch } from "react-redux";
import { deleteCommitment } from "../features/commitment/commitmentSlice";

const DeleteCommitment = () => {
  const { activeCommitment, setActiveCommitment } =
    useContext(CommitmentContext);
  const { modal, setModal } = useContext(ModalContext);

  const dispatch = useDispatch();
  const modal_ref = useRef();

  const handleDelete = () => {
    dispatch(deleteCommitment(activeCommitment._id));
    setModal("");
    setActiveCommitment("");
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
    <div className="modal-container delete-container" ref={modal_ref}>
      <h3 className="delete-title">
        Are you sure you want to delete this commitment?
      </h3>
      <div className="delete-options">
        <button className="btn btn-delete" onClick={handleDelete}>
          Delete
        </button>
        <button className="btn btn-cancel" onClick={() => setModal("")}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteCommitment;
