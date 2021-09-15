import React, { useRef, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../styles/Form.module.css";
import { Store } from "../utils/Store";
import Layout from "../components/Layout";
import { getError } from "../utils/error";
import { useSnackbar } from "notistack";

const Login = () => {
  const router = useRouter();
  const { redirect } = router.query; // login?redirect=/shipping
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    console.log("User info", userInfo);
    if (userInfo) {
      router.push("/dashboard");
    }
  }, [router, userInfo]);

  const email = useRef();
  const password = useRef();

  const submitHandler = async (email, password) => {
    closeSnackbar();
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      // Cookies.set("userInfo", data);
      localStorage.setItem("user-info", data.token);
      dispatch({ type: "USER_LOGIN", payload: data.token });
      router.push(redirect || "/dashboard");
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    submitHandler(email.current.value, password.current.value);
  };

  return (
    <Layout>
      <div className={styles.form} id="contact">
        <h2>Login</h2>
        <div className={styles.input_field}>
          <input ref={email} type="text" id="email" required />
          <label htmlFor="email">Your Email:</label>
        </div>
        <div className={styles.input_field}>
          <input ref={password} type="password" id="password" required />
          <label htmlFor="password">Your Password:</label>
        </div>
        <button onClick={(e) => handleSubmit(e)}>Send</button>
        <p>
          Don&apos;t have an account? &nbsp;
          <Link href="/register">
            <a className={styles.redirectLink}>Register</a>
          </Link>
        </p>
      </div>
    </Layout>
  );
};

export default Login;
