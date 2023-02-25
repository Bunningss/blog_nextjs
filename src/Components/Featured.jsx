import styles from "@/styles/Featured.module.css";
import Link from "next/link";
import Image from "next/image";
import arrow from "../../public/Images/icons/arrow.png";
import Post from "./ArticleCard";
import { temPosts } from "static";

const Featured = () => {
  return (
    <div className={styles.featured}>
      <div className={styles.heading}>
        <div className={styles.col}>
          <p className={`text_regular ${styles.featured_text}`}>
            Show your inner writer <br /> make an impression
          </p>
        </div>
        <div className={styles.col}>
          <h2 className={`header ${styles.featured_header}`}>featured posts</h2>
        </div>
        <div className={styles.col}>
          <Link
            href="/allarticles"
            className={`text_regular ${styles.featured_text}`}
          >
            show me everything
            <Image src={arrow} alt="" className={styles.featured_icon} />
          </Link>
        </div>
      </div>
      <div className={styles.posts}>
        {temPosts.map((post, indx) => (
          <Post key={indx} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Featured;
