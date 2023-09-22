// import Chart from "./components/Chart/Chart";
// import { ModalAddTransaction } from "./components/ModalAddTransaction/ModalAddTransaction";
import { ToastContainer } from "react-toastify";
import { ModalEditTransaction } from "./components/ModalEditTransaction/ModalEditTransaction";
import "./App.css";
import { useEffect, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "./redux/session/selectors";
import { refreshUser } from "./redux/session/operations";
import Loader from "./components/Loader/Loader";

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    const func = async () => {
      await dispatch(refreshUser());
    };
    func();
  }, []);

  return isRefreshing ? (
    <Loader />
  ) : (
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
      {/* <Chart /> */}
    </>
  );
}

export default App;
