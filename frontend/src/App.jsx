import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { RestrictedRoute } from "./components/RestrictedRoute/RestrictedRoute";
import { Route, Routes, Navigate } from "react-router-dom";
// import Chart from "./components/Chart/Chart";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "./redux/session/selectors";
import { refreshUser } from "./redux/session/operations";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import { DashboardPage } from "./Pages/DashboardPage/DashboardPage";
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
        <Route index element={<DashboardPage />} />
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
          {/*<Route path="statistics" element={<DiagramTab />} />*/}
          {/*{if(window.innerWidth < 768) {
        <Route path="currency" element={<Currency>} />
        }} */}
        </Route>
        <Route path="*" element={<Navigate to={"/login"} />} />
      </Routes>
    </>
  );
}

export default App;
