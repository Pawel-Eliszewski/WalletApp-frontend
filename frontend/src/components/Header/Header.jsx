import PropTypes from "prop-types";
import css from "./Header.module.css";

export const Header = ({ userName }) => {
  const handleOpenModalLogout = () => {
    // zmienia flagę w redux store: global.isModalLogoutOpen na true
  };

  userName = "Wasiljenko"; //docelowo będzie pobierane z redux
  const isModalLogoutOpen = false; //docelowo będzie pobierane z redux

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
            <p className={css.userName}>{userName}</p>
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

Header.propTypes = {
  userName: PropTypes.string.isRequired,
};
