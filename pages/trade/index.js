/* eslint-disable @next/next/no-img-element */
import Layout from "../../components/Layout";
import DashboardLayout from "../../components/DashboardLayout";
import { Store } from "../../utils/Store";
import Link from "next/link";
import React, { useContext, useState, useEffect } from "react";
import Styles from "./Trade.module.css";
import { useSnackbar } from "notistack";
import axios from "axios";
import { getError } from "../../utils/error";

const Trade = ({ filteredCoins }) => {
  const getCurrentPrice = async (coinSymbol) => {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinSymbol}&vs_currencies=usd`
    );
    const livePrice = await res?.json();
    return livePrice[coinSymbol]?.usd;
  };

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const BTC = {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image:
      "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
    current_price: 63000,
  };
  const USD = {
    id: "usd-coin",
    symbol: "usdc",
    name: "USD Coin",
    image:
      "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
    current_price: 1,
  };

  const { state } = useContext(Store);
  const { userInfo } = state;

  const [fromCoin, setFromCoin] = useState(USD);
  const [availableFromCoin, setAvailableFromCoin] = useState();

  const [toCoin, setToCoin] = useState(BTC);
  const [availableToCoin, setAvailableToCoin] = useState();

  useEffect(() => {
    // console.log(filteredCoins);
    const priceUpdate = async () => {
      let liveBTC = await getCurrentPrice("bitcoin");
      setToCoin({ ...toCoin, current_price: liveBTC });
    };
    priceUpdate();
  }, []);

  const [amountToTradeInUSD, setAmountToTradeInUSD] = useState();

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
        setAvailableFromCoin(Backend_res?.data[0]?.balanceAmount);
        setAvailableToCoin(Backend_res?.data[1]?.balanceAmount);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    if (userInfo) {
      getCoinData();
    }
  }, [userInfo]);

  const changeFromFunc = async () => {
    setAvailableFromCoin(0);
    var selectBox = document.getElementById("from-select-menu");
    var selectedValue = selectBox?.options[selectBox?.selectedIndex]?.value;
    filteredCoins.find((coin) => {
      if (coin?.symbol === selectedValue) {
        setFromCoin(coin);
        const foundFromCoin = userCoins.find(
          (user_coin) => user_coin?.symbol === coin?.symbol
        );
        if (foundFromCoin) {
          setAvailableFromCoin(foundFromCoin?.balanceAmount);
        }
      }
    });
  };

  const changeToFunc = async () => {
    setAvailableToCoin(0);
    var selectBox = document.getElementById("to-select-menu");
    var selectedValue = selectBox?.options[selectBox?.selectedIndex]?.value;
    filteredCoins?.find((coin) => {
      if (coin.symbol === selectedValue) {
        setToCoin(coin);
        const foundToCoin = userCoins.find(
          (user_coin) => user_coin?.symbol === coin?.symbol
        );
        if (foundToCoin) {
          setAvailableToCoin(foundToCoin?.balanceAmount);
        }
      }
    });
  };

  const handleFromAmountChange = (e) => {
    if (e.target.value > 0 || amountToTradeInUSD) {
      setAmountToTradeInUSD(fromCoin?.current_price * e.target.value);
    }
  };
  const handleToAmountChange = (e) => {
    if (e.target.value > 0 || amountToTradeInUSD) {
      setAmountToTradeInUSD(toCoin?.current_price * e.target.value);
    }
  };

  const submitHandler = async () => {
    closeSnackbar();
    let exchangeFromSymbol = fromCoin?.symbol;
    let exchangeFromAmount = amountToTradeInUSD / fromCoin?.current_price;
    let imageFromCoin = fromCoin?.image;
    console.log("exchange from sybol: ", exchangeFromSymbol);
    if (
      exchangeFromSymbol === "usdc" ||
      exchangeFromSymbol === "usdt" ||
      exchangeFromSymbol === "Dai"
    ) {
      exchangeFromAmount = exchangeFromAmount.toFixed(2);
    } else {
      exchangeFromAmount = exchangeFromAmount.toFixed(8);
    }
    let exchangeToSymbol = toCoin?.symbol;
    let exchangeToAmount = amountToTradeInUSD / toCoin?.current_price;
    if (
      exchangeToSymbol === "usdc" ||
      exchangeToSymbol === "usdt" ||
      exchangeToSymbol === "Dai"
    ) {
      exchangeToAmount = exchangeToAmount.toFixed(2);
    } else {
      exchangeToAmount = exchangeToAmount.toFixed(8);
    }
    let imageToCoin = toCoin?.image;

    try {
      await axios.post(
        `/api/users/exchange-transaction/`,
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
            authorization: `Bearer ${userInfo}`,
          },
        }
      );

      enqueueSnackbar("Transaction submited", { variant: "success" });
      setAvailableFromCoin(
        parseFloat(availableFromCoin) - parseFloat(exchangeFromAmount)
      );
      setAvailableToCoin(
        parseFloat(availableToCoin) + parseFloat(exchangeToAmount)
      );
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };
  const handleExchangeSubmit = async (e) => {
    e.preventDefault();
    if (availableFromCoin > amountToTradeInUSD / fromCoin.current_price) {
      submitHandler();
    } else {
      enqueueSnackbar("Insufficent funds", { variant: "error" });
    }
  };

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
              <div className={Styles.tradeContainer}>
                <div className={Styles.innerContainer}>
                  <h2>Exchange</h2>

                  {/* Exchange From Input */}
                  <div className={Styles.fromInput}>
                    <div className={Styles.inputLabelAvailable}>
                      <div className={Styles.label}>
                        <p>from </p>
                      </div>
                      <div className={Styles.availableBalance}>
                        <p>
                          Available: {availableFromCoin}
                          <span>{fromCoin?.symbol}</span>
                        </p>
                      </div>
                    </div>
                    <div className={Styles.amountSymbolInput}>
                      <img src={fromCoin?.image} alt={fromCoin?.name}></img>

                      <input
                        type="number"
                        placeholder="Enter amount"
                        onChange={(e) => handleFromAmountChange(e)}
                        value={
                          amountToTradeInUSD &&
                          amountToTradeInUSD / fromCoin?.current_price
                        }
                      ></input>
                      <select
                        id="from-select-menu"
                        onChange={() => changeFromFunc()}
                        value={fromCoin?.symbol}
                      >
                        {toCoin &&
                          filteredCoins.map((c) => {
                            if (toCoin?.symbol !== c?.symbol) {
                              return (
                                <option key={c?.id} value={c?.symbol}>
                                  {c?.id}
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
                          <span>{toCoin?.symbol}</span>
                        </p>
                      </div>
                    </div>
                    <div className={Styles.amountSymbolInput}>
                      <img src={toCoin?.image} alt={toCoin?.name}></img>

                      <input
                        placeholder="Enter amount"
                        type="number"
                        // step="0.0001"
                        value={
                          amountToTradeInUSD &&
                          amountToTradeInUSD / toCoin.current_price
                        }
                        onChange={(e) => handleToAmountChange(e)}
                      ></input>
                      <select
                        id="to-select-menu"
                        onChange={() => changeToFunc()}
                        value={toCoin?.symbol}
                      >
                        {filteredCoins.map((c) => {
                          if (fromCoin?.symbol !== c?.symbol) {
                            return (
                              <option key={c?.id} value={c?.symbol}>
                                {c?.id}
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
          </>
        )}
      </DashboardLayout>
    </Layout>
  );
};

export default Trade;

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
