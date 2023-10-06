import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectTransactionsYears } from "../../redux/finance/selectors";
import { getMonthsForYear } from "../../utils/getMonthsForYear";
import css from "./DropdownSelect.module.css";

export const DropdownSelect = ({ selectedYear, selectedMonth, onSelect }) => {
  const [isActive, setIsActive] = useState(false);

  const months = getMonthsForYear(selectedYear);

  const iconArrowClass = isActive ? css.iconArrowUp : css.iconArrowDown;
  const selectedClass =
    selectedMonth !== "Select a month"
      ? css.dropdownBtnActive
      : css.dropdownBtn;

  return (
    <div className={css.dropdown}>
      <div
        onClick={() => {
          setIsActive(!isActive);
        }}
        className={selectedClass}
      >
        {selectedMonth}
        <img
          className={iconArrowClass}
          src="./assets/icon-arrow.svg"
          alt="arrow icon"
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
          >
            {month}
          </div>
        ))}
      </div>
    </div>
  );
};

DropdownSelect.propTypes = {
  selectedMonth: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export const DropdownSelectY = ({ selectedYear, onSelect }) => {
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
      >
        {selectedYear}
        <img
          className={iconArrowClass}
          src="./assets/icon-arrow.svg"
          alt="arrow icon"
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
          >
            {year}
          </div>
        ))}
      </div>
    </div>
  );
};

DropdownSelectY.propTypes = {
  selectedYear: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
