import { ToastContainer } from "react-toastify";
// import { ModalAddTransaction } from "./components/ModalAddTransaction/ModalAddTransaction";
import "./App.css";
import RegistrationPage from "./Pages/RegistrationPage/RegistrationPage";
// import LoginPage from "./Pages/LoginPage/LoginPage.jsx";
// import RegistrationPage from "./Pages/RegistrationPage/RegistrationPage.jsx";

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
      {/* <LoginPage /> */}
      <RegistrationPage />
      {/* <ModalAddTransaction /> */}
    </>
  );
}

export default App;
