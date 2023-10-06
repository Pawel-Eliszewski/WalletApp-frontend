import PropTypes from "prop-types";
import { useState } from "react";
import css from "./DropdownMenu.module.css";

export const DropdownMenu = ({ category, onClick }) => {
  const [isActive, setIsActive] = useState(false);
  const [updatedCategory, setUpdatedCategory] = useState(null);

  let categories = [
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
    category !== "Select a category" ? css.dropdownBtnActive : css.dropdownBtn;

  return (
    <div className={css.dropdown} role="button" aria-expanded>
      <div
        onClick={() => {
          setIsActive(!isActive);
        }}
        className={categoryClass}
      >
        {category || updatedCategory}
        <img
          className={iconArrowClass}
          src="/assets/icon-arrow.svg"
          aria-hidden="true"
        ></img>
      </div>
      <div
        className={css.dropdownContent}
        style={{ display: isActive ? "block" : "none" }}
      >
        {categories.map((category) => (
          <div
            key={category}
            onClick={() => {
              onClick(category);
              setIsActive(!isActive);
              setUpdatedCategory(category);
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
  category: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
