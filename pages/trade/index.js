import Layout from "../../components/Layout";
import DashboardLayout from "../../components/DashboardLayout";
import { Store } from "../../utils/Store";
import { useRouter } from "next/router";
import NextLink from "next/link";
import React, { useRef, useState, useContext, useEffect } from "react";
import Styles from "./Trade.module.css";

const Trade = () => {
  const router = useRouter();
  const { redirect } = router.query;

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch({ type: "USER_LOGOUT" });
    router.push("/");
  };
  return (
    <Layout>
      <DashboardLayout>
        {userInfo ? (
          <div className={Styles.walletContainer}>
            <div className={Styles.innerContainer}>
              <h2>Exchange</h2>
              <h3>
                Here you can buy and sell any crypto currency from the list.
              </h3>
              <br />

              <div>
                <p>Exchange from: </p>
                <input type="text"></input>
              </div>
              <br />
              <hr />
              <br />
              <div>
                <p>Exchange to: </p>
                <input type="text"></input>
              </div>
              <br />
              <button className="button">Trade</button>
            </div>
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p>
              Must{" "}
              <NextLink href="/login" passHref>
                <a className={Styles.redicrectLink}> login </a>
              </NextLink>
              to access trading.
            </p>
          </div>
        )}
      </DashboardLayout>
    </Layout>
  );
};

export default Trade;
