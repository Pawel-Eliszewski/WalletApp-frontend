import PropTypes from "prop-types";
import { useState } from "react";
import css from "./DropdownMenu.module.css";

export const DropdownMenu = ({ expenseCategory, onClick }) => {
  const [isActive, setIsActive] = useState(false);

  let expenseCategories = [
    "Main expenses",
    "Products",
    "Car",
    "Self care",
    "Child care",
    "Household products",
    "Education",
    "Leisure",
    "Other expenses",
    "Entertainment",
  ];

  const iconArrowClass = isActive ? css.iconArrowUp : css.iconArrowDown;
  const categoryClass =
    expenseCategory !== "Select a category"
      ? css.dropdownBtnActive
      : css.dropdownBtn;

  return (
    <div className={css.dropdown}>
      <div
        onClick={() => {
          setIsActive(!isActive);
        }}
        className={categoryClass}
      >
        {expenseCategory}
        <img className={iconArrowClass} src="./assets/icon-arrow.svg"></img>
      </div>
      <div
        className={css.dropdownContent}
        style={{ display: isActive ? "block" : "none" }}
      >
        {expenseCategories.map((category) => (
          <div
            key={category}
            onClick={() => {
              onClick(category);
              setIsActive(!isActive);
            }}
            className={css.item}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

DropdownMenu.propTypes = {
  expenseCategory: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
