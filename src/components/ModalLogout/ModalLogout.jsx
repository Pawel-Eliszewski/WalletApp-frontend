import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsModalLogoutOpen } from "../../redux/global/selectors";
import { setIsModalLogoutOpen } from "../../redux/global/globalSlice";
import { logout } from "../../redux/session/operations";
import { toast } from "react-toastify";
import css from "./ModalLogout.module.css";

export const ModalLogout = () => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  const isModalLogoutOpen = useSelector(selectIsModalLogoutOpen);

  const handleNoClick = () => {
    dispatch(setIsModalLogoutOpen(false));
    document.body.style.overflow = "unset";
  };

  const handleYesClick = () => {
    try {
      dispatch(logout());
      dispatch(setIsModalLogoutOpen(false));
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        dispatch(setIsModalLogoutOpen(false));
        document.body.style.overflow = "unset";
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleBackdropClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      document.body.style.overflow = "unset";
      dispatch(setIsModalLogoutOpen(false));
    }
  };

  const backdropClass = isModalLogoutOpen ? css.backdropIsOpen : css.backdrop;

  return (
    <div className={backdropClass} onClick={handleBackdropClick}>
      <div className={css.container} ref={modalRef}>
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
