import { ToastContainer } from "react-toastify";
// import { ModalAddTransaction } from "./components/ModalAddTransaction/ModalAddTransaction";
import "./App.css";
import LoginPage from "./Pages/LoginPage/LoginPage.jsx";
import RegistrationPage from "./Pages/RegistrationPage/RegistrationPage.jsx";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/* <ModalAddTransaction /> */}
    </>
  );
}

export default App;
