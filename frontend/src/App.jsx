import { useEffect } from "react";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { RestrictedRoute } from "./components/RestrictedRoute/RestrictedRoute";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "./redux/session/selectors";
import { refreshUser } from "./redux/session/operations";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import { DashboardPage } from "./Pages/DashboardPage/DashboardPage";
import Loader from "./components/Loader/Loader";
import { Currency } from "./components/Currency/Currency";
import { DiagramTab } from "./components/DiagramTab/DiagramTab";
import "./App.css";
import { HomeTab } from "./components/HomeTab/HomeTab";

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    const func = async () => {
      dispatch(refreshUser());
    };
    func();
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <>
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
          <Route index path="/" element={<HomeTab />} />
          <Route path="/statistics" element={<DiagramTab />} />
          <Route path="/currency" element={<Currency />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
