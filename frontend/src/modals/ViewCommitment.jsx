import { useContext, useRef, useEffect } from "react";
import { CommitmentContext } from "../contexts/commitmentContext";
import { ModalContext } from "../contexts/modalContext";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteCommitment } from "../features/commitment/commitmentSlice";

const ViewCommitment = () => {
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
    <div className="modal-container" ref={modal_ref}>
      <div className="title-delete-container">
        <h1 className="modal-title">{activeCommitment.name}</h1>
        <div className="delete-icon">
          <AiOutlineDelete size={22} onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default ViewCommitment;
