import React, { useContext } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { Store } from "../utils/Store";
import { getError } from "../utils/error";
import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

import Navbar from "../components/Global/Navbar";
import Footer from "../components/Global/Footer";

export default function Layout({ title, description, children }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { darkMode, userInfo } = state;
  const { enqueueSnackbar } = useSnackbar();

  const [anchorEl, setAnchorEl] = useState(null);
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("userInfo");
    router.push("/");
  };
  return (
    <div>
      <Head>
        <title>{title ? `${title} - CC` : "Circulating Crypto"}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <Navbar />
      <div style={{ minHeight: "90vh", marginTop: "7.5vh" }}>{children}</div>
      <Footer />
    </div>
  );
}
