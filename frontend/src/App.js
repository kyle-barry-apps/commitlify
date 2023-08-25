import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header/Header";

// import { ModalContext } from "./contexts/modalContext";
// import { useContext } from "react";
// import AddCommitment from "./modals/addCommitment";

function App() {
  // const { modal, setModal } = useContext(ModalContext);

  return (
    <Router>
      {/* {modal === "addCommitment" && <AddCommitment />} */}
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
