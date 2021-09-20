/* eslint-disable @next/next/no-img-element */
import React from "react";
import Styles from "./Navbar.module.css";
import AssessmentOutlinedIcon from "@material-ui/icons/AssessmentOutlined";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Link from "next/link";
import { useContext, useEffect } from "react";
import Cookies from "js-cookie";

import { Store } from "../../../utils/Store";

const Navbar = () => {
  const { state, dispatch } = useContext(Store);
  const { darkMode } = state;

  useEffect(() => {
    if (darkMode) {
      dispatch({ type: "DARK_MODE_ON" });
    } else {
      dispatch({ type: "DARK_MODE_OFF" });
    }
  }, [darkMode, dispatch]);
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
        <Link href="/" passHref>
          <a>
            <img src="/logo.png" alt="brand" />
          </a>
        </Link>
      </div>
      <div className={Styles.navbarLinks}>
        <div>
          <Link href="/">
            <a
              id="darkmode-button"
              onClick={(e) => {
                e.preventDefault();
                toggleDarkmode();
              }}
            >
              <Brightness4Icon />
            </a>
          </Link>
        </div>
        <div>
          <Link href="/wallet" passHref>
            <a>
              <AccountBalanceWalletIcon />
            </a>
          </Link>
        </div>
        <div>
          <Link href="/dashboard" passHref>
            <a>
              <AssessmentOutlinedIcon />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
