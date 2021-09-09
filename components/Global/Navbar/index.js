import React from "react";
import Styles from "./Navbar.module.css";
// import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AssessmentOutlinedIcon from "@material-ui/icons/AssessmentOutlined";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import NextLink from "next/link";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import { Store } from "../../../utils/Store";

const Navbar = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { darkMode } = state;

  useEffect(() => {
    if (darkMode) {
      dispatch({ type: "DARK_MODE_ON" });
    } else {
      dispatch({ type: "DARK_MODE_OFF" });
    }
  }, []);
  const toggleDarkmode = () => {
    if (!darkMode) {
      dispatch({ type: "DARK_MODE_ON" });
      Cookies.set("darkMode", "ON");
    } else {
      dispatch({ type: "DARK_MODE_OFF" });
      Cookies.set("darkMode", "OFF");
    }
  };
  return (
    <div className={Styles.navbar}>
      <div className={Styles.brand}>
        <NextLink href="/" passHref>
          <a>
            <img src="/logo.png" alt="brand" />
          </a>
        </NextLink>
      </div>
      <div className={Styles.navbarLinks}>
        <div>
          <a
            href="/"
            style={{ color: darkMode && "var(--main-accent-2-text-color)" }}
            onClick={(e) => {
              e.preventDefault();
              toggleDarkmode();
            }}
          >
            <Brightness4Icon />
          </a>
        </div>
        <div>
          <NextLink href="/wallet" passHref>
            <a>
              <AccountBalanceWalletIcon />
            </a>
          </NextLink>
        </div>
        <div>
          <NextLink href="/dashboard" passHref>
            <a>
              <AssessmentOutlinedIcon />
            </a>
          </NextLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
