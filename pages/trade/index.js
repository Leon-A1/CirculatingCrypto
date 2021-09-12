/* eslint-disable @next/next/no-img-element */
import Layout from "../../components/Layout";
import DashboardLayout from "../../components/DashboardLayout";
import { Store } from "../../utils/Store";
import Link from "next/link";
import React, { useContext, useState, useEffect } from "react";
import Styles from "./Trade.module.css";
import { useSnackbar } from "notistack";
import axios from "axios";
import Cookies from "js-cookie";
import { getError } from "../../utils/error";

const Trade = ({ filteredCoins }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const [fromCoin, setFromCoin] = useState(USD);
  const [availableFromCoin, setAvailableFromCoin] = useState();

  const [toCoin, setToCoin] = useState(BTC);
  const [availableToCoin, setAvailableToCoin] = useState();

  const [amountToTradeInUSD, setAmountToTradeInUSD] = useState();

  useEffect(() => {
    if (userInfo) {
      setAvailableFromCoin(userInfo.coins[0].balanceAmount);
      setAvailableToCoin(userInfo.coins[1].balanceAmount);
    }
  }, [userInfo]);

  const changeFromFunc = async () => {
    setAvailableFromCoin(0);
    var selectBox = document.getElementById("from-select-menu");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    filteredCoins.find((coin) => {
      if (coin.symbol === selectedValue) {
        setFromCoin(coin);
        const foundFromCoin = userInfo.coins.find(
          (user_coin) => user_coin.symbol === coin.symbol
        );
        if (foundFromCoin) {
          setAvailableFromCoin(foundFromCoin.balanceAmount);
        }
      }
    });
  };

  const changeToFunc = async () => {
    setAvailableToCoin(0);
    var selectBox = document.getElementById("to-select-menu");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    filteredCoins.find((coin) => {
      if (coin.symbol === selectedValue) {
        setToCoin(coin);
        const foundToCoin = userInfo.coins.find(
          (user_coin) => user_coin.symbol === coin.symbol
        );
        if (foundToCoin) {
          setAvailableToCoin(foundToCoin.balanceAmount);
        }
      }
    });
  };

  const handleFromAmountChange = (e) => {
    setAmountToTradeInUSD(fromCoin.current_price * e.target.value);
  };
  const handleToAmountChange = (e) => {
    setAmountToTradeInUSD(toCoin.current_price * e.target.value);
  };

  const submitHandler = async () => {
    closeSnackbar();
    let exchangeFromSymbol = fromCoin.symbol;
    let exchangeFromAmount = amountToTradeInUSD / fromCoin.current_price;
    let imageFromCoin = fromCoin.image;

    let exchangeToSymbol = toCoin.symbol;
    let exchangeToAmount = amountToTradeInUSD / toCoin.current_price;
    let imageToCoin = toCoin.image;

    let token = userInfo.token;
    try {
      const { data } = await axios.post(
        `/api/users/exchange-transaction/?id=${userInfo._id}`,
        {
          exchangeFromSymbol,
          exchangeFromAmount,
          exchangeToSymbol,
          exchangeToAmount,
          amountToTradeInUSD,
          imageFromCoin,
          imageToCoin,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      await dispatch({ type: "USER_LOGIN", payload: data });
      console.log("RESPONSE DAATA: ", data);
      await Cookies.set("userInfo", data);
      enqueueSnackbar("Transaction submited", { variant: "success" });

      // router.push(redirect || "/dashboard");
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };
  const handleExchangeSubmit = async (e) => {
    e.preventDefault();
    if (availableFromCoin > amountToTradeInUSD / fromCoin.current_price) {
      submitHandler();
      // try {
      //   const { updateUserInfoData } = await axios.get(
      //     "/api/users/update-user-details",
      //     {
      //       headers: {
      //         authorization: `Bearer ${userInfo.token}`,
      //       },
      //     }
      //   );
      //   console.log("The data from update response: ", updateUserInfoData);

      //   dispatch({ type: "USER_UPDATE", payload: updateUserInfoData });

      //   Cookies.set("userInfo", data);
      //   router.push(redirect || "/dashboard");
      // } catch {
      //   console.log("something went wrong");
      // }

      // dispatch({
      //   type: "USER_UPDATE",
      //   payload: { data },
      // });
    } else {
      enqueueSnackbar("Insufficent funds", { variant: "error" });
    }
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

              {/* Exchange From Input */}
              <div className={Styles.fromInput}>
                <div className={Styles.inputLabelAvailable}>
                  <div className={Styles.label}>
                    <p>from </p>
                  </div>
                  <div className={Styles.availableBalance}>
                    <p>
                      Available: {availableFromCoin}
                      <span>{fromCoin && fromCoin.symbol}</span>
                    </p>
                  </div>
                </div>
                <div className={Styles.amountSymbolInput}>
                  {fromCoin && (
                    <img src={fromCoin.image} alt={fromCoin.name}></img>
                  )}
                  <input
                    type="number"
                    // min="0.000001"
                    // step="0.0001"
                    // pattern="[0.000001-10000]"
                    placeholder="Enter amount"
                    onChange={(e) => handleFromAmountChange(e)}
                    value={
                      amountToTradeInUSD &&
                      amountToTradeInUSD / fromCoin.current_price
                    }
                  ></input>
                  <select
                    id="from-select-menu"
                    onChange={() => changeFromFunc()}
                    value={fromCoin.symbol}
                  >
                    {filteredCoins.map((c) => {
                      if (toCoin.symbol !== c.symbol) {
                        return (
                          <option key={c.id} value={c.symbol}>
                            {c.id}
                          </option>
                        );
                      }
                    })}
                  </select>
                </div>
              </div>

              {/* Exchange To Input */}
              <div className={Styles.fromInput}>
                <div className={Styles.inputLabelAvailable}>
                  <div className={Styles.label}>
                    <p>to </p>
                  </div>
                  <div className={Styles.availableBalance}>
                    <p>
                      Available: {availableToCoin}
                      <span>{toCoin && toCoin.symbol}</span>
                    </p>
                  </div>
                </div>
                <div className={Styles.amountSymbolInput}>
                  {toCoin && <img src={toCoin.image} alt={toCoin.name}></img>}
                  <input
                    placeholder="Enter amount"
                    type="number"
                    step="0.0001"
                    value={
                      amountToTradeInUSD &&
                      amountToTradeInUSD / toCoin.current_price
                    }
                    onChange={(e) => handleToAmountChange(e)}
                  ></input>
                  <select
                    id="to-select-menu"
                    onChange={() => changeToFunc()}
                    value={toCoin.symbol}
                  >
                    {filteredCoins.map((c) => {
                      if (fromCoin.symbol !== c.symbol) {
                        return (
                          <option key={c.id} value={c.symbol}>
                            {c.id}
                          </option>
                        );
                      }
                    })}
                  </select>
                </div>
              </div>
              <br />
              <button
                className="button"
                onClick={(e) => handleExchangeSubmit(e)}
              >
                Trade
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
