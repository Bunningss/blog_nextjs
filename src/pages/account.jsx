import styles from "../styles/Account.module.css";
import Head from "next/head";
import { useState } from "react";
import { publicRequest } from "@/lib/requestMethods";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { loginStart, loginFailure, loginSuccess } from "@/Redux/userSlice";
import FormInput from "@/Components/FormInput";
import PrimayButton from "@/Components/PrimayButton";

const Account = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const registerInputs = [
    {
      label: "Name",
      type: "text",
      placeholder: "Enter Your Name",
      errorMessage: "Please enter full name",
      required: true,
      minLength: 5,
      maxLength: 40,
    },
    {
      label: "Enter Email Address",
      type: "email",
      placeholder: "Enter Your Email",
      errorMessage: "Please enter a valid email",
      required: true,
      minLength: 5,
      maxLength: 80,
    },
    {
      label: "Enter Your Password",
      type: "password",
      placeholder: "Enter Your Password",
      errorMessage: "Password must be 8+ characters",
      required: true,
      minLength: 8,
      maxLength: 256,
    },
    {
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords do not match",
      required: true,
      minLength: 8,
      maxLength: 256,
    },
  ];

  const loginInputs = [
    {
      name: "Email",
      label: "Enter Email Address",
      type: "email",
      placeholder: "Enter Your Email",
      errorMessage: "Please enter a valid email",
      required: true,
      minLength: 5,
      maxLength: 80,
    },
    {
      name: "Password",
      label: "Enter Your Password",
      type: "password",
      placeholder: "Enter Your Password",
      errorMessage: "Password must be 8+ characters",
      required: true,
      minLength: 5,
      maxLength: 256,
    },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const loginData = Object.fromEntries(data.entries());
    dispatch(loginStart());
    try {
      const res = await publicRequest.post("/auth/login", loginData);
      dispatch(loginSuccess(res.data.data));
      router.push("/");
    } catch (error) {
      dispatch(loginFailure());
      setErrorMessage(error.response.data.data);
    }
  };

  return (
    <>
      <Head>
        <title>The Blog - Login or Register</title>
        <meta name="description" content="Blog posts" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`default ${styles.account}`}>
        <div className={styles.wrapper}>
          <div className={styles.col}>
            <h2 className={`header ${styles.account_header}`}>Login</h2>
            <form onSubmit={handleLogin} className={styles.account_form}>
              {loginInputs.map((input, indx) => (
                <FormInput key={indx} input={input} />
              ))}
              <p className={`errorMessage`}>{errorMessage}</p>
              <PrimayButton text={"Login"} />
            </form>
          </div>
          <div className={styles.col}>
            <h2 className={`header ${styles.account_header}`}>register</h2>
            <form action="" className={styles.account_form}>
              {registerInputs.map((input, indx) => (
                <FormInput key={indx} input={input} />
              ))}
              {/* <select name="" id="" className={`input`}>
                <option value="">Yes</option>
                <option value="">No</option>
              </select> */}
              <PrimayButton text={"Register"} />
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Account;
