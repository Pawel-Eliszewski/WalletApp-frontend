import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

export const Navigation = () => {
  return (
    <nav>
      <ul className={css.nav}>
        <li>
          <NavLink className={css.item} to="/">
            <img className={css.logo} src="/assets/icon-home.png" />
            <p className={css.description}>Home</p>
          </NavLink>
        </li>
        <li>
          <NavLink className={css.item} to="#">
            <img className={css.logo} src="/assets/icon-statistics.png" />
            <p className={css.description}>Statistics</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="#">
            <img
              className={`${css.logo} ${css.dolar}`}
              src="/assets/icon-dolar.png"
            />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
