import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsAuth } from "../../redux/session/selectors";

export const RestrictedRoute = ({ component: Component, redirectTo = "/" }) => {
  const isAuth = useSelector(selectIsAuth);

  return isAuth ? <Navigate to={redirectTo} /> : Component;
};
