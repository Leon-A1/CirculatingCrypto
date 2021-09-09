import Layout from "../components/Layout";
import React, { useContext, useEffect, useRef } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../styles/AnimatedContactForm.module.css";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import { getError } from "../utils/error";
import { useSnackbar } from "notistack";

export default function Register() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitHandler(
      email.current.value,
      password.current.value,
      confirmPassword.current.value
    );
  };
  useEffect(() => {
    if (userInfo) {
      router.push("/dashboard");
    }
  }, []);

  const submitHandler = async (email, password, confirmPassword) => {
    console.log(email, password, confirmPassword);
    closeSnackbar();
    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords don't match", { variant: "error" });
      return;
    }
    try {
      const { data } = await axios.post("/api/users/register", {
        email,
        password,
      });
      dispatch({ type: "USER_LOGIN", payload: data });
      Cookies.set("userInfo", data);
      router.push(redirect || "/dashboard");
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };
  return (
    <Layout>
      <div className={styles.form}>
        <h2>Register Form</h2>

        <div className={styles.input_field}>
          <input ref={email} />
          <label htmlFor="email">Email:</label>
        </div>
        <div className={styles.input_field}>
          <input ref={password} type="password" />
          <label htmlFor="Password">Password:</label>
        </div>
        <div className={styles.input_field}>
          <input ref={confirmPassword} type="password" />
          <label htmlFor="Password">Confirm Password:</label>
        </div>
        <button onClick={(e) => handleSubmit(e)}>Register</button>
        <p>
          Already have an account? &nbsp;
          <NextLink href={`/login?redirect=${redirect || "/"}`} passHref>
            <a>Login</a>
          </NextLink>
        </p>
      </div>
    </Layout>
  );
}
