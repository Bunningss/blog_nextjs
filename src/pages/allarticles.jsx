import styles from "../styles/AllArticles.module.css";
import Head from "next/head";
import Post from "@/Components/Post";
import { categories } from "static";
import { useEffect, useState } from "react";
import { publicRequest } from "@/lib/requestMethods";

const Allarticles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const res = await publicRequest.get("/article");
        setArticles(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getArticles();
  }, []);
  return (
    <>
      <Head>
        <title>The Blog - All Posts</title>
        <meta name="description" content="Blog posts" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`default ${styles.all_posts}`}>
        <div className={styles.wrapper}>
          {/* Category */}
          <div className={styles.col}>
            <div className={styles.filter}>
              <h2 className={`header ${styles.filter_header}`}>Filter posts</h2>
              <div className={styles.filter_content}>
                <div className={styles.group}>
                  <label
                    htmlFor="search"
                    className={`text_regular ${styles.filter_text}`}
                  >
                    Search post
                  </label>
                  <input
                    type="text"
                    className={`input ${styles.filter_input}`}
                    placeholder="Search Post"
                    name="search"
                  />
                </div>
                <div className={styles.group}>
                  <label
                    htmlFor="category"
                    className={`text_regular ${styles.filter_text}`}
                  >
                    filter by category
                  </label>
                  <select
                    name="category"
                    id="category"
                    className={`input ${styles.filter_input}`}
                  >
                    <option value="">Select category</option>
                    {categories.map((category, indx) => (
                      <option key={indx} value={category.value}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* All Posts */}
          <div className={styles.col}>
            {articles.map((post, indx) => (
              <Post key={indx} post={post} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Allarticles;
