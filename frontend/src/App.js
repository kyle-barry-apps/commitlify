import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header/Header";
import { CommitmentProvider } from "./contexts/commitmentContext";
import { ModalContext } from "./contexts/modalContext";
import { useContext } from "react";
import AddCommitment from "./modals/addCommitment";
import EditCommitment from "./modals/editCommitment";
import DeleteCommitment from "./modals/deleteCommitment";
import "./modals/modals.css";
import ViewCommitment from "./modals/ViewCommitment";
import About from "./pages/About/About";

function App() {
  const { modal } = useContext(ModalContext);

  return (
    <CommitmentProvider>
      <Router>
        {modal !== "" && <div className="modal-overlay"></div>}
        {modal === "addCommitment" && <AddCommitment />}
        {modal === "viewCommitment" && <ViewCommitment />}
        {modal === "deleteCommitment" && <DeleteCommitment />}
        {modal === "editCommitment" && <EditCommitment />}
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <ToastContainer />
      </Router>
    </CommitmentProvider>
  );
}

export default App;
