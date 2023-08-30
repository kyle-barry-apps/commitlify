import { useContext, useRef, useEffect, useState } from "react";
import { CommitmentContext } from "../contexts/commitmentContext";
import { ModalContext } from "../contexts/modalContext";
import { useDispatch } from "react-redux";

const ViewCommitment = () => {
  const { activeCommitment, setActiveCommitment } =
    useContext(CommitmentContext);
  const { modal, setModal } = useContext(ModalContext);
  const [dropdown, setDropdown] = useState(false);
  const dispatch = useDispatch();
  const modal_ref = useRef();

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
        <div
          onClick={() => setDropdown(!dropdown)}
          className="ellipsis-container"
        >
          <img
            className="ellipsis-image"
            src="/assets/ellipsis-vertical-solid.svg"
            alt="ellipsis"
          />
        </div>
        {dropdown && (
          <div className="dropdown-container">
            <span onClick={() => setModal("editCommitment")}>
              Edit Commitment
            </span>
            <span
              className="dropdown-delete"
              onClick={() => setModal("deleteCommitment")}
            >
              Delete Commitment
            </span>
          </div>
        )}
      </div>
      <p className="view-commitment-description">
        {activeCommitment.description}
      </p>
      <span>Commitment Type: {activeCommitment.commitmentType.timeframe}</span>
      <span>Pledge Amount: ${activeCommitment.moneyCommitted}</span>
    </div>
  );
};

export default ViewCommitment;
