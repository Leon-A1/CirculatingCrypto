import Layout from "../components/Layout";
import React, { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../styles/Form.module.css";
import { Store } from "../utils/Store";
import { useSnackbar } from "notistack";
import { getError } from "../utils/error";

export default function Register() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const [loading, setLoading] = useState(false);
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
  }, [userInfo, router]);

  const submitHandler = async (email, password, confirmPassword) => {
    setLoading(true);
    closeSnackbar();
    if (password !== confirmPassword || !password) {
      enqueueSnackbar("Passwords don't match", { variant: "error" });
      setLoading(false);
      return;
    }
    if (!email || !confirmPassword || !password) {
      enqueueSnackbar("Please enter required details", { variant: "error" });
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post("/api/users/register", {
        email,
        password,
      });
      localStorage.setItem("user-info", data.token);
      setLoading(false);
      dispatch({ type: "USER_LOGIN", payload: data.token });
      router.push(redirect || "/dashboard");
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className={styles.formWrapper}>
        <div className={styles.form}>
          <h2>Register</h2>

          <div className={styles.input_field}>
            <input ref={email} name="email" id="email" required />
            <label htmlFor="email">Email:</label>
          </div>
          <div className={styles.input_field}>
            <input ref={password} id="password" type="password" required />
            <label htmlFor="password">Password:</label>
          </div>
          <div className={styles.input_field}>
            <input
              ref={confirmPassword}
              id="confirm-password"
              type="password"
              required
            />
            <label htmlFor="confirm-password">Confirm Password:</label>
          </div>
          {loading && (
            <p
              style={{
                width: "100%",
                textAlign: "center",
                transform: "translateY(-2rem)",
                position: "absolute",
              }}
            >
              Loading...
            </p>
          )}
          <button onClick={(e) => handleSubmit(e)}>Register</button>
          <p>
            Already have an account? &nbsp;
            <Link href="/login">
              <a className={styles.redirectLink}>Login</a>
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
