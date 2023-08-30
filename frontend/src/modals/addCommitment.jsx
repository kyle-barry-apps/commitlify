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
  const [timeCommitted, setTimeCommitted] = useState(3);
  const [daysOfWeek, setDaysOfWeek] = useState([
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]);

  const { modal, setModal } = useContext(ModalContext);

  const dispatch = useDispatch();
  const modal_ref = useRef();

  console.log(timeCommitted);

  const handleSubmit = (e) => {
    e.preventDefault();

    const time =
      commitmentType === "daily" || commitmentType === "one-time"
        ? null
        : timeCommitted;

    const days = commitmentType === "daily" ? daysOfWeek : null;

    dispatch(
      createCommitment({
        name,
        description,
        moneyCommitted: pledgeAmount,
        commitmentType: {
          timeframe: commitmentType,
          numberOfDays: time,
          daysOfWeek: days,
        },
      })
    );
    setName("");
    setModal("");
  };

  const handleDaySelect = (day) => {
    const index = daysOfWeek.indexOf(day);
    if (index > -1) {
      setDaysOfWeek(daysOfWeek.filter((d) => d !== day));
    } else {
      setDaysOfWeek([...daysOfWeek, day]);
    }
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
            One Time
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
            <div className="days-container">
              <div
                className={
                  daysOfWeek.includes("Sunday")
                    ? "commitment-type day active"
                    : "commitment-type day"
                }
                onClick={() => handleDaySelect("Sunday")}
              >
                Sunday
              </div>
              <div
                className={
                  daysOfWeek.includes("Monday")
                    ? "commitment-type day active"
                    : "commitment-type day"
                }
                onClick={() => handleDaySelect("Monday")}
              >
                Monday
              </div>
              <div
                className={
                  daysOfWeek.includes("Tuesday")
                    ? "commitment-type day active"
                    : "commitment-type day"
                }
                onClick={() => handleDaySelect("Tuesday")}
              >
                Tuesday
              </div>
              <div
                className={
                  daysOfWeek.includes("Wednesday")
                    ? "commitment-type day active"
                    : "commitment-type day"
                }
                onClick={() => handleDaySelect("Wednesday")}
              >
                Wednesday
              </div>
              <div
                className={
                  daysOfWeek.includes("Thursday")
                    ? "commitment-type day active"
                    : "commitment-type day"
                }
                onClick={() => handleDaySelect("Thursday")}
              >
                Thursday
              </div>
              <div
                className={
                  daysOfWeek.includes("Friday")
                    ? "commitment-type day active"
                    : "commitment-type day"
                }
                onClick={() => handleDaySelect("Friday")}
              >
                Friday
              </div>
              <div
                className={
                  daysOfWeek.includes("Saturday")
                    ? "commitment-type day active"
                    : "commitment-type day"
                }
                onClick={() => handleDaySelect("Saturday")}
              >
                Saturday
              </div>
            </div>
          ) : commitmentType === "weekly" ? (
            <label htmlFor="time-pledge">Days per week</label>
          ) : commitmentType === "monthly" ? (
            <label htmlFor="time-pledge">Days per month</label>
          ) : null}
          {commitmentType === "weekly" && (
            <input
              type="number"
              name="time-pledge"
              className="form-control pledge-amount"
              defaultValue={3}
              onChange={(e) => setTimeCommitted(e.target.value)}
              min={1}
              max={7}
            />
          )}
          {commitmentType === "monthly" && (
            <input
              type="number"
              name="time-pledge"
              className="form-control pledge-amount"
              defaultValue={3}
              onChange={(e) => setTimeCommitted(e.target.value)}
              min={1}
              max={31}
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
