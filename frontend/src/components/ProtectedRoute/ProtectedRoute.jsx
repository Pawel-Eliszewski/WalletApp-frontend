import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectIsAuth,
  selectIsRefreshing,
} from "../../redux/session/selectors";

export const ProtectedRoute = ({ component: Component, redirectTo = "/" }) => {
  const isAuth = useSelector(selectIsAuth);
  const isRefreshing = useSelector(selectIsRefreshing);
  const shouldRedirect = !isAuth && !isRefreshing;

  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
