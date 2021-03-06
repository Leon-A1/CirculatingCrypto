import Layout from "../../components/Layout";
import DashboardLayout from "../../components/DashboardLayout";
import { Store } from "../../utils/Store";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useContext } from "react";
import Styles from "./Settings.module.css";

const Settings = () => {
  const router = useRouter();
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
          <div className={Styles.settingsContainer}>
            <div className={Styles.innerContainer}>
              <h2>Settings</h2>
              <button className="button" onClick={(e) => handleLogout(e)}>
                Log out
              </button>
            </div>
          </div>
        ) : (
          <div className={Styles.goToLoginContainer}>
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
