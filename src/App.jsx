import Login from "./pages/Login/Login";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register/Register";
import Voting from "./pages/Voting/Voting";
import Ranking from "./pages/Ranking/Ranking";
import Evaluation from "./pages/Evaluation/Evaluation";
import Gathering from "./pages/Gathering/Gathering";
import ConfirmationToast from "./pages/ConfirmationToast/ConfirmationToast";

function App() {
  return (
    // TODO protected Routes
    // polish ui
    // polish logic
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/gathering" element={<Gathering />} />
          <Route path="/voting" element={<Voting />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/evaluation" element={<Evaluation />} />
        </Routes>
        {/* <ConfirmationToast></ConfirmationToast> */}
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
