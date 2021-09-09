import React, { useRef, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "./AnimatedContactForm.module.css";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import Layout from "../components/Layout";
import { useSnackbar } from "notistack";
import getError from "../../utils/error";

const Contact = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const router = useRouter();
  const { redirect } = router.query; // login?redirect=/shipping

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    if (userInfo) {
      router.push("/dashboard");
    }
  }, [router, userInfo]);
  const submitHandler = async ({ email, password }) => {
    closeSnackbar();
    try {
      const { data } = await axios.post("/api/users/login", {
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
  // function ValidateEmail(mail) {
  //   if (
  //     /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
  //       mail
  //     )
  //   ) {
  //     return true;
  //   }
  //   return false;
  // }
  // function ValidatePhone(number) {
  //   if (/^[0-9-]*$/.test(number)) {
  //     return true;
  //   }
  //   return false;
  // }

  // function SubmitNewEmail(e) {
  //   e.preventDefault();
  //   console.log(NewEmailAdress.current.value);
  //   if (!ValidateEmail(NewEmailAdress.current.value)) {
  //     setMessage("Please enter a valid email adress");
  //     document.getElementById("lds-ring-id").style.display = "none";
  //   } else if (NewEmailAdress.current.value && NewName.current.value) {
  //     document.getElementById("lds-ring-id").style.display = "inline-block";
  //     axios
  //       .post("/api/form-submition", {
  //         email_adress: NewEmailAdress.current.value,
  //         name: NewName.current.value,
  //         message: NewMessage.current.value,
  //       })
  //       .then((res) => {
  //         console.log(res);
  //         setMessage("Thank you!");
  //         document.getElementById("lds-ring-id").style.display = "none";
  //       })
  //       .catch((e) =>
  //         setMessage("oops something went wrong please try again...")
  //       );
  //   }
  // }

  const NewEmailAdress = useRef();
  const NewName = useRef();
  const NewMessage = useRef("");

  return (
    <Layout>
      <form
        className={styles.form}
        id="contact"
        onSubmit={() => submitHandler()}
      >
        <h2>Login Form</h2>
        <div className={styles.input_field}>
          <input ref={NewName} type="text" id="name" required />
          <label htmlFor="name">Your name:</label>
        </div>
        <div className={styles.input_field}>
          <input ref={NewEmailAdress} type="text" id="email" required />

          <label htmlFor="email">Your email:</label>
        </div>
        <br></br>
        <div className={styles.input_field}>
          <textarea ref={NewMessage} type="text" rows="4" id="msg" required />
          <label htmlFor="msg">Your message:</label>
        </div>
        <br></br>
        <br></br> <br></br>
        <button type="submit">Send</button>
        <p>
          Don&apos;t have an account? &nbsp;
          <Link href={`/register?redirect=${redirect || "/"}`} passHref>
            <a>Register</a>
          </Link>
        </p>
      </form>
    </Layout>
  );
};

export default Contact;
