/* eslint-disable @next/next/no-img-element */
import React from "react";
import Styles from "./Footer.module.css";
import Link from "next/Link";

const Footer = () => {
  return (
    <div className={Styles.footer}>
      <div className={Styles.brand}>
        <Link href="/">
          <a>
            <img style={{ width: 50 }} src="/logo.png" alt="logo" />
          </a>
        </Link>
      </div>

      <h6 style={{ color: "white" }}>
        Circulating Crypto. All rights reserved.{" "}
      </h6>
    </div>
  );
};

export default Footer;
