import Layout from "../../components/Layout";
import DashboardLayout from "../../components/DashboardLayout";
import Styles from "./Wallet.module.css";
import React, { useContext } from "react";
import { Store } from "../../utils/Store";
// import { useRouter } from "next/router";
import Link from "next/link";

const Wallet = () => {
  // const router = useRouter();
  // const { redirect } = router.query;

  const { state } = useContext(Store);
  const { userInfo } = state;

  return (
    <Layout>
      <DashboardLayout>
        {userInfo ? (
          <div className={Styles.walletContainer}>
            <div className={Styles.innerContainer}>
              <h2>Total wallet value: 100.00$</h2>
              <p>{userInfo.email}</p>
              <p>{userInfo._id}</p>
              <br />
              <br />

              {userInfo ? (
                userInfo.balances.map((coin) => {
                  return (
                    <div className={Styles.coinRow} key={coin.symbol}>
                      <p>
                        <strong>{coin.symbol}</strong>
                      </p>
                      <p>{coin.amount}</p>
                    </div>
                  );
                })
              ) : (
                <p>no available balances.</p>
              )}
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
              <Link href="/login">
                <a className={Styles.redirectLink}> login</a>
              </Link>{" "}
              to access wallet.
            </p>
          </div>
        )}
      </DashboardLayout>
    </Layout>
  );
};
export default Wallet;
