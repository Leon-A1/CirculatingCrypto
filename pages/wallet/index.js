/* eslint-disable @next/next/no-img-element */
import Layout from "../../components/Layout";
import DashboardLayout from "../../components/DashboardLayout";
import Styles from "./Wallet.module.css";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../../utils/Store";
import Link from "next/link";
import axios from "axios";
const Wallet = ({ filteredCoins }) => {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [totalWalletValue, setTotalWalletValue] = useState("Calculating...");
  const [userCoins, setUserCoins] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCoinData = async () => {
      setIsLoading(true);
      try {
        const Backend_res = await axios.get(`/api/users/coins`, {
          headers: { authorization: `Bearer ${userInfo}` },
        });
        setUserCoins(Backend_res?.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    if (userInfo) {
      getCoinData();
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo && userCoins) {
      setIsLoading(true);
      let totalAmount = 0;
      userCoins?.forEach((wallet_coin) => {
        filteredCoins.forEach((api_coin) => {
          if (wallet_coin?.symbol === api_coin?.symbol) {
            totalAmount =
              wallet_coin?.balanceAmount * api_coin?.current_price +
              totalAmount;
            setTotalWalletValue(totalAmount?.toFixed(2));
          }
        });
      });
      setIsLoading(false);
    }
  }, [userCoins, userInfo, filteredCoins]);
  return (
    <Layout>
      <DashboardLayout>
        {isLoading ? (
          <div className="loadingWrapper">
            <h2>Loading...</h2>
          </div>
        ) : (
          <>
            {userInfo ? (
              <div className={Styles.walletContainer}>
                <div className={Styles.innerContainer}>
                  <h2>
                    {totalWalletValue}
                    {totalWalletValue != "Calculating..." && "$"}
                  </h2>
                  <br />
                  <br />
                  {userCoins &&
                    userCoins?.map((coin) => {
                      return (
                        <div className={Styles.coinRow} key={coin?.symbol}>
                          <div>
                            <img src={coin?.image} alt={coin?.symbol} />
                          </div>
                          <div>
                            <p>{coin?.name ? coin?.name : coin?.symbol}</p>
                          </div>
                          <div>
                            <p style={{ textTransform: "uppercase" }}>
                              {coin?.symbol}
                            </p>
                          </div>
                          <div>
                            <p>{coin?.balanceAmount}</p>
                          </div>
                        </div>
                      );
                    })}
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
          </>
        )}
      </DashboardLayout>
    </Layout>
  );
};
export default Wallet;
export const getServerSideProps = async () => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
  );

  const filteredCoins = await res.json();

  return {
    props: {
      filteredCoins,
    },
  };
};
