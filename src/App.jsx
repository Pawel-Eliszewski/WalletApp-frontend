import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMedia } from "react-use";
import { selectIsRefreshing } from "./redux/session/selectors";
import { refreshUser } from "./redux/session/operations";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import DashboardPage from "./Pages/DashboardPage/DashboardPage";
import { Loader } from "./components/Loader/Loader";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { RestrictedRoute } from "./components/RestrictedRoute/RestrictedRoute";
import { HomeTab } from "./components/HomeTab/HomeTab";
import { Currency } from "./components/Currency/Currency";
import { DiagramTab } from "./components/DiagramTab/DiagramTab";

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    const func = async () => {
      dispatch(refreshUser());
    };
    func();
  }, [dispatch]);

  const isMobile = useMedia("(max-width: 767px)");

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
          {isMobile && <Route path="/currency" element={<Currency />} />}
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
