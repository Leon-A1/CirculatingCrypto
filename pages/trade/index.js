/* eslint-disable @next/next/no-img-element */
import Layout from "../../components/Layout";
import DashboardLayout from "../../components/DashboardLayout";
import { Store } from "../../utils/Store";
// import { useRouter } from "next/router";
import Link from "next/link";
import React, { useContext, useState, useEffect } from "react";
import Styles from "./Trade.module.css";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const Trade = ({ filteredCoins }) => {
  const BTC = {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image:
      "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
    current_price: 45502,
  };
  const USD = {
    id: "usd-coin",
    symbol: "usdc",
    name: "USD Coin",
    image:
      "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
    current_price: 1,
  };

  // const router = useRouter();
  // const { redirect } = router.query;

  const { state } = useContext(Store);
  const { userInfo } = state;

  const [fromCoin, setFromCoin] = useState(USD);
  const [toCoin, setToCoin] = useState(BTC);

  const [availableFromCoin, setAvailableFromCoin] = useState();
  // userInfo.balances[0].amount

  const [availableToCoin, setAvailableToCoin] = useState();
  // userInfo.balances[1].amount

  const [amountToTradeInUSD, setAmountToTradeInUSD] = useState();

  useEffect(() => {
    setAvailableFromCoin(userInfo.balances[0].amount);
    setAvailableToCoin(userInfo.balances[1].amount);
  }, []);
  // useEffect(() => {
  //   console.log("AMOUNT TO TRADE IN USD: ", amountToTradeInUSD);
  //   console.log("User info: ", userInfo);
  //   console.log(filteredCoins);
  // }, [amountToTradeInUSD]);

  const changeFromFunc = async () => {
    setAvailableFromCoin(0);
    var selectBox = document.getElementById("from-select-menu");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    filteredCoins.find((coin) => {
      if (coin.id === selectedValue) {
        setFromCoin(coin);
        const foundFromCoin = userInfo.balances.find(
          (user_coin) => user_coin.symbol === coin.id
        );
        if (foundFromCoin) {
          setAvailableFromCoin(foundFromCoin.amount);
        }
      }
    });
  };

  const changeToFunc = async () => {
    setAvailableToCoin(0);
    var selectBox = document.getElementById("to-select-menu");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    filteredCoins.find((coin) => {
      if (coin.id === selectedValue) {
        setToCoin(coin);
        const foundToCoin = userInfo.balances.find(
          (user_coin) => user_coin.symbol === coin.id
        );
        if (foundToCoin) {
          setAvailableToCoin(foundToCoin.amount);
        }
      }
    });
  };

  const handleFromAmountChange = (e) => {
    console.log(e.target.value);
    setAmountToTradeInUSD(fromCoin.current_price * e.target.value);
  };
  const handleToAmountChange = (e) => {
    console.log(e.target.value);
    setAmountToTradeInUSD(toCoin.current_price * e.target.value);
  };

  return (
    <Layout>
      <DashboardLayout>
        {userInfo ? (
          <div className={Styles.tradeContainer}>
            <div className={Styles.innerContainer}>
              <h2>Exchange</h2>
              <h3>
                Here you can buy and sell any crypto currency from the list.
              </h3>
              {/* Exchange coin inputs */}
              {/* Exchange From Input */}
              <div className={Styles.fromInput}>
                <div className={Styles.inputLabelAvailable}>
                  <div className={Styles.label}>from </div>
                  <div className={Styles.availableBalance}>
                    Available: {availableFromCoin} {fromCoin && fromCoin.symbol}
                  </div>
                </div>
                <div className={Styles.amountSymbolInput}>
                  {fromCoin && (
                    <img src={fromCoin.image} alt={fromCoin.name}></img>
                  )}
                  <input
                    type="text"
                    placeholder="Enter amount"
                    onChange={(e) => handleFromAmountChange(e)}
                    value={
                      amountToTradeInUSD
                        ? amountToTradeInUSD / fromCoin.current_price
                        : ""
                    }
                  ></input>
                  <select
                    id="from-select-menu"
                    onChange={() => changeFromFunc()}
                    value={fromCoin.id}
                  >
                    {filteredCoins.map((c) => {
                      return (
                        <option key={c.id} value={c.id}>
                          {c.id}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              {/* Exchange To Input */}
              <div className={Styles.fromInput}>
                <div className={Styles.inputLabelAvailable}>
                  <div className={Styles.label}>to </div>
                  <div className={Styles.availableBalance}>
                    Available: {availableToCoin} {toCoin && toCoin.symbol}
                  </div>
                </div>
                <div className={Styles.amountSymbolInput}>
                  {toCoin && <img src={toCoin.image} alt={toCoin.name}></img>}
                  <input
                    type="text"
                    placeholder="Enter amount"
                    value={
                      amountToTradeInUSD
                        ? amountToTradeInUSD / toCoin.current_price
                        : ""
                    }
                    onChange={(e) => handleToAmountChange(e)}
                  ></input>
                  <select
                    id="to-select-menu"
                    onChange={() => changeToFunc()}
                    value={toCoin.id}
                  >
                    {filteredCoins.map((c) => {
                      return (
                        <option key={c.id} value={c.id}>
                          {c.id}
                        </option>
                      );
                    })}
                  </select>
                </div>
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
              <Link href="/login" passHref>
                <a className={Styles.redirectLink}> login </a>
              </Link>
              to access trading.
            </p>
          </div>
        )}
      </DashboardLayout>
    </Layout>
  );
};

export default Trade;

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
