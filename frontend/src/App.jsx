import { ToastContainer } from "react-toastify";
// import { ModalAddTransaction } from "./components/ModalAddTransaction/ModalAddTransaction";
import { ModalEditTransaction } from "./components/ModalEditTransaction/ModalEditTransaction";
import "./App.css";

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
      <ModalEditTransaction />
    </>
  );
}

export default App;
