import styles from "../styles/Hero.module.css";
import Image from "next/image";
import landing from "../../public/Images/landing.png";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <Image src={landing} alt="" fill className={styles.hero_image} />
    </div>
  );
};

export default Hero;
