import styles from "./Styles/Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header className={styles.header}>
			<nav className={styles.nav}>
				<ul>
					<li>
						<Link to="/design">Design</Link>
					</li>
					<li>
						<Link to="/styles">Launch</Link>
					</li>
				</ul>
				<hr className={styles.navline} />
				<p className={styles.navPara}>Front</p>
			</nav>
		</header>
	);
};

export default Header;
