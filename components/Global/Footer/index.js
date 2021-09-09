import React from "react";
import Styles from "./Footer.module.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import Brightness4Icon from "@material-ui/icons/Brightness4";
const Footer = () => {
  return (
    <div className={Styles.footer}>
      <div className={Styles.brand}>
        <a href="/">
          <img style={{ width: 50 }} src="/logo.png" alt="logo" />
        </a>
      </div>

      <h6 style={{ color: "white" }}>
        Circulating Crypto. All rights reserved.{" "}
      </h6>
      {/* <div className={Styles.footerLinks}>
        <div>
          <a href="/">
            <Brightness4Icon />
          </a>
        </div>
        <div>
          <a href="/">
            <AccountBalanceWalletIcon />
          </a>
        </div>
        <div>
          <a href="/">
            <AccountCircleIcon />
          </a>
        </div>
      </div> */}
    </div>
  );
};

export default Footer;
