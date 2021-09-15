/* eslint-disable @next/next/no-img-element */
import Layout from "../../components/Layout";
import DashboardLayout from "../../components/DashboardLayout";
import Styles from "./Wallet.module.css";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../../utils/Store";
// import { useRouter } from "next/router";
import Link from "next/link";
import Cookies from "js-cookie";
import axios from "axios";
const Wallet = ({ filteredCoins }) => {
  // const router = useRouter();
  // const { redirect } = router.query;

  const { state } = useContext(Store);
  const { userInfo } = state;

  const [totalWalletValue, setTotalWalletValue] = useState(0);

  const [userCoins, setUserCoins] = useState();

  useEffect(() => {
    const getCoinData = async () => {
      try {
        const Backend_res = await axios.get(`/api/users/coins`, {
          headers: { authorization: `Bearer ${userInfo}` },
        });
        setUserCoins(Backend_res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (userInfo) {
      getCoinData();
    }
  }, []);

  return (
    <Layout>
      <DashboardLayout>
        {userInfo ? (
          <div className={Styles.walletContainer}>
            <div className={Styles.innerContainer}>
              <h2>{totalWalletValue}$</h2>
              <br />
              <br />
              {userCoins ? (
                userCoins.map((coin) => {
                  return (
                    <div className={Styles.coinRow} key={coin.symbol}>
                      <div>
                        <img src={coin.image} alt={coin.symbol} />
                      </div>
                      <div>
                        <p>{coin.name ? coin.name : coin.symbol}</p>
                      </div>
                      <div>
                        <p style={{ textTransform: "uppercase" }}>
                          {coin.symbol}
                        </p>
                      </div>
                      <div>
                        <p>{coin.balanceAmount}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>no available balances.</p>
              )}
            </div>
          </div>
        ) : (
          <div className={Styles.goToLoginContainer}>
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
export const getServerSideProps = async () => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"
  );

  const filteredCoins = await res.json();

  return {
    props: {
      filteredCoins,
    },
  };
};
