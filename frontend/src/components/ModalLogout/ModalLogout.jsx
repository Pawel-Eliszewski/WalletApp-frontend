import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsModalLogoutOpen } from "../../redux/global/globalSlice";
import { logout } from "../../redux/session/operations";
import { toast } from "react-toastify";
import css from "./ModalLogout.module.css";

export const ModalLogout = () => {
  const dispatch = useDispatch();

  const handleNoClick = () => {
    dispatch(setIsModalLogoutOpen(false));
  };

  const handleYesClick = () => {
    try {
      dispatch(logout());
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleNoClick();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={css.overlay} onClick={handleNoClick}>
      <div className={css.modal}>
        <p className={css.question}>Are you sure you want to leave?</p>
        <div className={css.buttons}>
          <button className={css["item-yes"]} onClick={handleYesClick}>
            Yes
          </button>
          <button className={css["item-no"]} onClick={handleNoClick}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};
