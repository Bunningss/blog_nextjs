import styles from "../styles/Publish.module.css";
import { useEffect, useState } from "react";
import { uploadFile } from "@/lib/firebaseUpload";
import { publicRequest } from "@/lib/requestMethods";
import Head from "next/head";
import FormInput from "@/Components/FormInput";
import PrimayButton from "@/Components/PrimayButton";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const Publish = () => {
  const [values, setValues] = useState({
    Title: "",
    Category: "",
    Article: "",
  });
  const [file, setFile] = useState("");
  const user = useSelector((state) => state.loggedIn);
  const router = useRouter();
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const finishTask = async (url, downloadURL, values) => {
    try {
      await publicRequest.post(`${url}`, {
        Image: downloadURL,
        ...values,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "/article";
    try {
      uploadFile(file, values, url, finishTask);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      router.push("/account");
    }
  }, [user]);

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
          <form onSubmit={handleSubmit} className={styles.publish_form}>
            <div className={styles.group}>
              <label htmlFor="media" className={styles.publish_label}>
                Choose Media
              </label>
              <input
                type="file"
                name="Image"
                className={`input ${styles.publish_input}`}
                required
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <FormInput
              input={{
                name: "Title",
                placeholder: "Enter Article Title",
                errorMessage: "Article title is required",
                required: true,
                label: "Enter a title",
              }}
              handleChange={handleChange}
            />
            <FormInput
              input={{
                name: "Article",
                cols: "30",
                rows: "10",
                placeholder: "Enter Article",
                required: true,
                errorMessage: "Article Description is required",
                type: "TEXTAREA",
              }}
              handleChange={handleChange}
            />
            <div className={styles.group}>
              <label htmlFor="Category" className={styles.publish_label}>
                Select category
              </label>
              <select
                name="Category"
                id="category"
                className={`input ${styles.publish_input}`}
                required
                onChange={handleChange}
              >
                <option value="">category</option>
                <option value="lifestyle">lifestyle</option>
                <option value="food">food</option>
              </select>
            </div>
            <PrimayButton text={"publish article"} />
          </form>
        </div>
      </main>
    </>
  );
};

export default Publish;
