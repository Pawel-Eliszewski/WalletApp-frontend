import { useEffect, lazy } from "react";
import { ToastContainer } from "react-toastify";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { RestrictedRoute } from "./components/RestrictedRoute/RestrictedRoute";
import { Route, Routes, Navigate } from "react-router-dom";
// import Chart from "./components/Chart/Chart";
// import { ModalAddTransaction } from "./components/ModalAddTransaction/ModalAddTransaction";
// import { ModalEditTransaction } from "./components/ModalEditTransaction/ModalEditTransaction";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "./redux/session/selectors";
import { refreshUser } from "./redux/session/operations";
import Loader from "./components/Loader/Loader";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    const func = async () => {
      dispatch(refreshUser());
    };
    func();
  }, []);
console.log( window.innerWidth)
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
      <Routes>
        <Route
          path="/register"
          element={
            <RestrictedRoute redirectTo="/" component={<RegisterPage />} />
          }
        />
        <Route
          path="/login"
          element={<RestrictedRoute redirectTo="/" component={<LoginPage />} />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute redirectTo="/login" component={<DashboardPage />} />
          }
        >
          <Route index element={<HomeTab />} />
          <Route path="statistics" element={<DiagramTab />} />
        </Route>
        <Route path="*" element={<Navigate to={"/login"} />} />
      </Routes>
      {/* <ModalAddTransaction /> */}
      {/* <ModalEditTransaction /> */}
      {/* <Chart /> */}
    </>
  );
}

export default App;
