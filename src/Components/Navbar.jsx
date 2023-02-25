import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import logo from "@/../public/Images/logo.png";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className={`default ${styles.navbar}`}>
      <div className={styles.wrapper}>
        <div className={styles.col}>
          <ul className={styles.list}>
            <Link href="/allarticles">
              <li className={`text_regular ${styles.list_item}`}>
                all articles
              </li>
            </Link>
            <Link href="/authors">
              <li className={`text_regular ${styles.list_item}`}>authors</li>
            </Link>
            <Link href="/cookbook">
              <li className={`text_regular ${styles.list_item}`}>cook book</li>
            </Link>
          </ul>
        </div>
        <div className={styles.col}>
          <Link href="/" className={styles.nav_logo_wrapper}>
            <Image src={logo} alt="" className={styles.logo_image} />
          </Link>
        </div>
        <div className={styles.col}>
          <ul className={styles.list}>
            <Link href="/account">
              <li className={`text_regular ${styles.list_item}`}>my account</li>
            </Link>
            <Link href="/publish">
              <li className={`text_regular ${styles.list_item}`}>publish</li>
            </Link>
            <Link href="/promotions">
              <li className={`text_regular ${styles.list_item}`}>promotions</li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
