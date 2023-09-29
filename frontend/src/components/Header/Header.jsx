import css from "./Header.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectIsModalLogoutOpen } from "../../redux/global/selectors";
import { setIsModalLogoutOpen } from "../../redux/global/globalSlice";
// import { selectUser } from "../../redux/session/selectors";
import { ModalLogout } from "../ModalLogout/ModalLogout";

export const Header = () => {
  const dispatch = useDispatch();
  const isModalLogoutOpen = useSelector(selectIsModalLogoutOpen);
  // const user = useSelector(selectUser);

  let user = { email: "dev@dev.com" };

  const handleOpenModalLogout = () => {
    dispatch(setIsModalLogoutOpen(true));
  };

  return (
    <div className={css.wrapper}>
      {isModalLogoutOpen ? (
        <ModalLogout />
      ) : (
        <div className={css.header}>
          <div className={css.logoWrapper}>
            <img className={css.logo} src="/assets/icon-wallet.png" />
            <img className={css.appName} src="/assets/icon-wallet-text.png" />
          </div>
          <div className={css.nav}>
            <p className={css.userName}>{user.email}</p>
            <div className={css.boxExit} onClick={handleOpenModalLogout}>
              <img className={css.iconExit} src="/assets/icon-exit-doors.png" />
              <p className={css.textExit}>Exit</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
