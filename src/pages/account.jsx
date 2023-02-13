import styles from "../styles/Account.module.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import { publicRequest } from "@/lib/requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  loginStart,
  loginFailure,
  loginSuccess,
  registerStart,
} from "@/Redux/userSlice";
import FormInput from "@/Components/FormInput";
import PrimayButton from "@/Components/PrimayButton";

const Account = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [values, setValues] = useState({
    Name: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.loggedIn);
  const registerInputs = [
    {
      label: "Name",
      name: "Name",
      type: "text",
      placeholder: "Enter Your Name",
      errorMessage: "Please enter full name",
      required: true,
      minLength: 5,
      maxLength: 40,
    },
    {
      label: "Enter Email Address",
      name: "Email",
      type: "email",
      placeholder: "Enter Your Email",
      errorMessage: "Please enter a valid email",
      required: true,
      minLength: 5,
      maxLength: 80,
    },
    {
      label: "Enter Your Password",
      name: "Password",
      type: "password",
      placeholder: "Enter Your Password",
      errorMessage: "Password must be 8+ characters",
      required: true,
      minLength: 8,
      maxLength: 256,
    },
    {
      label: "Confirm Password",
      name: "ConfirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords do not match",
      required: true,
      minLength: 8,
      maxLength: 256,
      pattern: values.Password,
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

  const handleRegisterInputs = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const loginData = Object.fromEntries(data.entries());
    dispatch(loginStart());
    try {
      const res = await publicRequest.post("/auth/login", loginData);
      dispatch(loginSuccess(res.data.data));
      // router.push("/");
    } catch (error) {
      dispatch(loginFailure());
      console.log(error.response.data.data);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (values.Password !== values.ConfirmPassword) {
      return;
    }
    dispatch(registerStart());
    try {
      await publicRequest.post("/auth/register", values);
      dispatch(loginSuccess());
      setSuccessMessage("Registration successful. Please log in.");
    } catch (error) {
      dispatch(loginFailure());
      setRegisterError(error.response.data.data);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

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
            <form onSubmit={handleRegister} className={styles.account_form}>
              {registerInputs.map((input, indx) => (
                <FormInput
                  key={indx}
                  input={input}
                  handleChange={handleRegisterInputs}
                />
              ))}
              {/* <select name="" id="" className={`input`}>
                <option value="">Yes</option>
                <option value="">No</option>
              </select> */}
              <p className={`errorMessage`}>{registerError}</p>
              <p className={`successMessage`}>{successMessage}</p>
              <PrimayButton text={"Register"} />
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Account;
