import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Post.module.css";

const Post = () => {
  return (
    <div className={styles.post}>
      <Link href={`/post/dgdfg`}>
        <div className={styles.image_container}>
          <Image
            src="https://images.pexels.com/photos/2065195/pexels-photo-2065195.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
            className={styles.post_image}
            fill
          />
        </div>
        <p className={`text_regular ${styles.post_title}`}>
          2-minute maggie recipe
        </p>
      </Link>
    </div>
  );
};

export default Post;
