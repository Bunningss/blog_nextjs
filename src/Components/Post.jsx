import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Post.module.css";

const Post = ({ post }) => {
  return (
    <div className={styles.post}>
      <Link href={`/post/dgdfg`}>
        <div className={styles.image_container}>
          <Image
            src={post.image}
            alt=""
            className={styles.post_image}
            fill
            sizes="(max-width: 1220px) 100%"
          />
        </div>
        <p className={`text_regular ${styles.post_title}`}>{post.title}</p>
      </Link>
    </div>
  );
};

export default Post;
