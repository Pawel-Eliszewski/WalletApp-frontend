import { NavLink, useLocation } from "react-router-dom";
import { useMediaQuery } from "@react-hook/media-query";
import css from "./Navigation.module.css";

export const Navigation = () => {
  const location = useLocation();
  const isMax767px = useMediaQuery("(max-width: 767px)");

  const navItems = [
    { path: "/", label: "Home", icon: "icon-home.svg" },
    { path: "/statistics", label: "Statistics", icon: "icon-statistics.svg" },
    ...(isMax767px
      ? [{ path: "/currency", label: "Currency", icon: "icon-dollar.svg" }]
      : []),
  ];

  return (
    <nav>
      <ul className={css.nav}>
        {navItems.map((item, index) => (
          <li key={index}>
            <NavLink className={css.item} to={item.path}>
              <img
                className={`${css.logo} ${
                  location.pathname === item.path ? css["active-logo"] : ""
                }`}
                src={`/assets/${item.icon}`}
                alt={item.label}
              />
              <p
                className={`${css.description} ${
                  location.pathname === item.path ? css.bold : ""
                }`}
              >
                {item.label}
              </p>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
