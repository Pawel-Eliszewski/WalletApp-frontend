import { useDispatch } from "react-redux";
// import { clearReduxStore } from "./redux/actions";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import css from "./ModalLogout.module.css";
import { useEffect } from "react";

const ModalLogout = ({ isOpen, onClose }) => {
	const dispatch = useDispatch();

	const handleNoClick = () => {
		onClose();
	};

	const handleYesClick = () => {
		// Wylogowanie użytkownika
		// Dodać kod do wylogowania użytkownika (wywołując odpowiednią akcję Redux lub API)
		try {
			// Po udanym wylogowaniu, czyszczenie Redux store w initial state
			dispatch(clearReduxStore());
			onClose();
		} catch (error) {
			toast.error("Błąd podczas wylogowywania");
			onClose();
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
		<>
			{isOpen && (
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
			)}
		</>
	);
};

ModalLogout.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default ModalLogout;
