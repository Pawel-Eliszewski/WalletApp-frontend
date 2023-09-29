import { NavLink, useLocation } from "react-router-dom";
import css from "./Navigation.module.css";

export const Navigation = () => {
	const location = useLocation();

	return (
		<nav>
			<ul className={css.nav}>
				<li>
					<NavLink className={css.item} to="/">
						<img
							className={`${css.logo} ${location.pathname === "/register" ? css["active-logo"] : ""}`}
							src="/assets/icon-home.svg"
							alt="Home"
						/>

						<p className={`${css.description} ${location.pathname === "/register" ? css.bold : ""}`}>Home</p>
					</NavLink>
				</li>
				<li>
					<NavLink className={css.item} to="/statistics">
						<img
							className={`${css.logo} ${location.pathname === "/statistics" ? css["active-logo"] : ""}`}
							src="/assets/icon-statistics.svg"
							alt="Statistics"
						/>
						<p className={`${css.description} ${location.pathname === "/statistics" ? css.bold : ""}`}>Statistics</p>
					</NavLink>
				</li>
				<li>
					<NavLink className={`${css.item} ${css.dolar}`} to="#">
						<img
							className={`${css.logo} ${location.pathname === "#" ? css["active-logo"] : ""}`}
							src="/assets/icon-dolar.svg"
							alt="Dolar"
						/>
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};
