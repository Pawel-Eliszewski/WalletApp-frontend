import { ModalAddTransaction } from "./components/ModalAddTransaction/ModalAddTransaction";
import "./App.css";
import { ToastContainer } from "react-toastify";

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
    </>
  );
}

export default App;
