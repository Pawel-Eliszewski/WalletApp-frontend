import { useSelector } from "react-redux";
import {
  selectUser,
  selectIsAuth,
  selectIsRefreshing,
} from "../redux/session/selectors";

export const useAuth = () => {
  const isAuth = useSelector(selectIsAuth);
  const isRefreshing = useSelector(selectIsRefreshing);
  const user = useSelector(selectUser);

  return {
    isAuth,
    isRefreshing,
    user,
  };
};
