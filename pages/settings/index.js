import Layout from "../../components/Layout";
import DashboardLayout from "../../components/DashboardLayout";
import { Store } from "../../utils/Store";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useContext } from "react";
import Styles from "./Settings.module.css";

const Settings = () => {
  const router = useRouter();
  // const { redirect } = router.query;

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
              <h2>Settings</h2>
              <button className="button" onClick={(e) => handleLogout(e)}>
                Log out
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              marginTop: "20vh",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p>
              Must{" "}
              <Link href="/login">
                <a className={Styles.redirectLink}> login </a>
              </Link>
              to access settings.
            </p>
          </div>
        )}
      </DashboardLayout>
    </Layout>
  );
};

export default Settings;
