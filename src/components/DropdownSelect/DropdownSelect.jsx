import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectTransactionsYears } from "../../redux/finance/selectors";
import { getMonthsForYear } from "../../utils/getMonthsForYear";
import css from "./DropdownSelect.module.css";

export const DropdownSelectMonth = ({
  selectedYear,
  selectedMonth,
  onSelect,
}) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      const handleKeyDown = (e) => {
        switch (e.key) {
          case "ArrowUp":
            // Obsługa strzałki w górę - przechodzenie do poprzedniego elementu
            e.preventDefault(); // Zapobiega przewijaniu strony
            // Dodaj logikę do przechodzenia do poprzedniego elementu na liście
            break;
          case "ArrowDown":
            // Obsługa strzałki w dół - przechodzenie do następnego elementu
            e.preventDefault(); // Zapobiega przewijaniu strony
            // Dodaj logikę do przechodzenia do następnego elementu na liście
            break;
          case "Escape":
            // Obsługa klawisza Escape - zamknięcie menu
            setIsActive(false);
            break;
          default:
            break;
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isActive]);

  const months = getMonthsForYear(selectedYear);

  const iconArrowClass = isActive ? css.iconArrowUp : css.iconArrowDown;
  const selectedClass =
    selectedMonth !== "Select a month"
      ? css.dropdownBtnActive
      : css.dropdownBtn;

  return (
    <div className={css.dropdown} role="listbox">
      <div
        onClick={() => {
          setIsActive(!isActive);
        }}
        className={selectedClass}
        role="button"
        aria-expanded={isActive}
        aria-haspopup="listbox"
        tabIndex="0"
      >
        {selectedMonth}
        <img
          className={iconArrowClass}
          src="/assets/icon-arrow.svg"
          alt="arrow icon"
          aria-hidden="true"
        />
      </div>
      <div
        className={css.dropdownContent}
        style={{ display: isActive ? "block" : "none" }}
      >
        {months.map((month) => (
          <div
            key={month}
            onClick={() => {
              onSelect(month);
              setIsActive(!isActive);
            }}
            className={css.item}
            role="menuitem"
          >
            {month}
          </div>
        ))}
      </div>
    </div>
  );
};

DropdownSelectMonth.propTypes = {
  selectedMonth: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export const DropdownSelectYear = ({ selectedYear, onSelect }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setIsActive((isActive) => !isActive);
    }
    return () => {
      mounted = false;
    };
  }, []);

  const years = useSelector(selectTransactionsYears);

  const iconArrowClass = isActive ? css.iconArrowUp : css.iconArrowDown;
  const selectedClass =
    selectedYear !== "Select a year" ? css.dropdownBtnActive : css.dropdownBtn;

  return (
    <div className={css.dropdown}>
      <div
        onClick={() => {
          setIsActive(!isActive);
        }}
        className={selectedClass}
        role="button"
        aria-expanded={isActive ? "true" : "false"}
      >
        {selectedYear}
        <img
          className={iconArrowClass}
          src="/assets/icon-arrow.svg"
          alt="arrow icon"
          aria-hidden="true"
        />
      </div>
      <div
        className={css.dropdownContent}
        style={{ display: isActive ? "block" : "none" }}
      >
        {years.map((year) => (
          <div
            key={year}
            onClick={() => {
              onSelect(year);
              setIsActive(!isActive);
            }}
            className={css.item}
            role="menuitem"
          >
            {year}
          </div>
        ))}
      </div>
    </div>
  );
};

DropdownSelectYear.propTypes = {
  selectedYear: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
