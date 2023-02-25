import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/ArticleCard.module.css";

const ArticleCard = ({ post }) => {
  return (
    <div className={styles.article_card}>
      <Link href={`/post/${post._id}`}>
        <div className={styles.image_container}>
          <Image
            src={post.Image}
            alt=""
            className={styles.article_card_image}
            fill
            sizes="(max-width: 1220px) 100%"
          />
        </div>
        <p className={`text_regular ${styles.article_card_title}`}>
          {post.Title}
        </p>
      </Link>
    </div>
  );
};

export default ArticleCard;
