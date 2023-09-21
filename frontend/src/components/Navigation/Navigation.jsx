// import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

export const Navigation = () => {
	return (
		<nav>
			<ul className={css.nav}>
				<li>
					<a className={css.item} to="#">
						<img className={css.logo} src="/assets/icon-home.svg" />
						<p className={css.description}>Home</p>
					</a>
				</li>
				<li>
					<a className={css.item} to="#">
						<img className={css.logo} src="/assets/icon-statistics.png" />
						<p className={css.description}>Statistics</p>
					</a>
				</li>
				<li>
					<a to="#">
						<img className={`${css.logo} ${css.dolar}`} src="/assets/icon-dolar.png" />
					</a>
				</li>
			</ul>
		</nav>
	);
};
