import styles from "../styles/Publish.module.css";
import Head from "next/head";

const Publish = () => {
  return (
    <>
      <Head>
        <title>The Blog - Publish An Article</title>
        <meta name="description" content="Write an article" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`default ${styles.publish}`}>
        <div className={styles.wrapper}>
          <form action="" className={styles.publish_form}>
            <div className={styles.group}>
              <label htmlFor="media" className={styles.publish_label}>
                Choose Media
              </label>
              <input
                type="file"
                name="media"
                className={`input ${styles.publish_input}`}
              />
            </div>
            <div className={styles.group}>
              <label htmlFor="title" className={styles.publish_label}>
                Enter a title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter Article Title"
                className={`input ${styles.publish_input}`}
              />
            </div>
            <div className={styles.group}>
              <label htmlFor="category" className={styles.publish_label}>
                Select category
              </label>
              <select
                name="category"
                id="category"
                className={`input ${styles.publish_input}`}
              >
                <option value="">category</option>
              </select>
            </div>
            <div className={styles.group}>
              <label htmlFor="description" className={styles.publish_label}>
                Type Article
              </label>
              <textarea
                name="description"
                cols="30"
                rows="10"
                placeholder="Enter Article"
                className={`input ${styles.publish_input}`}
              ></textarea>
            </div>
            <button className={`input`}>Publish</button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Publish;
