import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import logo from "@/../public/Images/logo.png";
import { colOne, colTwo } from "static";
import ListItem from "./ListItem";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className={`default ${styles.navbar}`}>
      <div className={styles.wrapper}>
        <div className={styles.col}>
          <ul className={styles.list}>
            {colOne.map((item, indx) => (
              <ListItem item={item} key={indx} />
            ))}
          </ul>
        </div>
        <div className={styles.col}>
          <Link href="/" className={styles.nav_logo_wrapper}>
            <Image src={logo} alt="" className={styles.logo_image} />
          </Link>
        </div>
        <div className={styles.col}>
          <ul className={styles.list}>
            {colTwo.map((item, indx) => (
              <ListItem item={item} key={indx} />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
