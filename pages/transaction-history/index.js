import Layout from "../../components/Layout";
import DashboardLayout from "../../components/DashboardLayout";
import { Store } from "../../utils/Store";
import { useRouter } from "next/router";
import NextLink from "next/link";
import React, { useRef, useState, useContext, useEffect } from "react";
import Styles from "./TransactionHistory.module.css";

const TransactionHistory = () => {
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
              <h2>Transaction history</h2>
              <button className="button" onClick={(e) => handleLogout(e)}>
                Log out
              </button>
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
              to access transaction history.
            </p>
          </div>
        )}
      </DashboardLayout>
    </Layout>
  );
};

export default TransactionHistory;
