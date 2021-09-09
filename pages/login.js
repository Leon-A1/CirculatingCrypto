import React, { useRef, useState, useContext, useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../styles/AnimatedContactForm.module.css";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import Layout from "../components/Layout";
import { getError } from "../utils/error";
import { useSnackbar } from "notistack";

const Contact = () => {
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
  }, []);

  const email = useRef();
  const password = useRef();

  const submitHandler = async (email, password) => {
    closeSnackbar();
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      dispatch({ type: "USER_LOGIN", payload: data });
      console.log("LOGIN RESPONSE DATA:", data);
      Cookies.set("userInfo", data);
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
        <h2>Login Form</h2>
        <div className={styles.input_field}>
          <input ref={email} />
          <label htmlFor="email">Your Email:</label>
        </div>
        <div className={styles.input_field}>
          <input ref={password} />
          <label htmlFor="Password">Your Password:</label>
        </div>
        <button onClick={(e) => handleSubmit(e)}>Send</button>
        <p>
          Don&apos;t have an account? &nbsp;
          <NextLink href={`/register?redirect=${redirect || "/"}`} passHref>
            <a>Register</a>
          </NextLink>
        </p>
      </div>
    </Layout>
  );
};

export default Contact;
