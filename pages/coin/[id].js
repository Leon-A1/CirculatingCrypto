import Layout from "../../components/Layout";
import Styles from "./Coin.module.css";
import Image from "next/image";
import coinGecko from "../../coinGecko";
import HistoryChart from "../../components/Chart/HistoryChart";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Coin = ({ coin }) => {
  const router = useRouter();
  const { id } = router.query;
  const [coinData, setCoinData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const formatData = (data) => {
    return data.map((el) => {
      return {
        t: el[0],
        y: el[1].toFixed(2),
      };
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [day, week, year, detail] = await Promise.all([
        coinGecko.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "1",
          },
        }),
        coinGecko.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "7",
          },
        }),
        coinGecko.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "365",
          },
        }),
        coinGecko.get("/coins/markets/", {
          params: {
            vs_currency: "usd",
            ids: id,
          },
        }),
      ]);

      setCoinData({
        day: formatData(day.data.prices),
        week: formatData(week.data.prices),
        year: formatData(year.data.prices),
        detail: detail.data[0],
      });
      setIsLoading(false);
    };

    fetchData();
  }, [id]);
  return (
    <>
      {isLoading ? (
        <div className={Styles.loadingWrapper}>
          <h2>Loading...</h2>
        </div>
      ) : (
        <Layout>
          <div className={Styles.coinPage}>
            <div className={Styles.coin_container}>
              <div className={Styles.imgWrapper}>
                <Image
                  src={coin.image.large}
                  alt={coin.name}
                  className={Styles.coinImage}
                  width="100%"
                  height="100px"
                  objectFit="cover"
                  style={{ display: "block", margin: "auto" }}
                />
              </div>
              <h1 className={Styles.coin_name}>{coin.name}</h1>
              <h2 className={Styles.coin_ticker}>{coin.symbol}</h2>
              {/* Coin details flex table */}
              {HistoryChart && <HistoryChart data={coinData} />}
              <div className={Styles.coinDetails}>
                <div>
                  <p>Current price: {coin.market_data.current_price.usd}$</p>
                  <p>
                    Circulating supply: {coin.market_data.circulating_supply}
                  </p>
                  <p>Max supply: {coin.market_data.max_supply}</p>
                </div>
                <div>
                  <p>
                    Price Change 24h:{" "}
                    <span
                      style={{
                        color:
                          coin.market_data.price_change_24h < 0
                            ? "#f00606"
                            : "#13c783",
                      }}
                    >
                      {coin.market_data.price_change_24h.toFixed(2)}$
                    </span>
                  </p>
                  <p>
                    Price Change 7d:{" "}
                    <span
                      style={{
                        color:
                          coin.market_data.price_change_percentage_7d < 0
                            ? "#f00606"
                            : "#13c783",
                      }}
                    >
                      {coin.market_data.price_change_percentage_7d.toFixed(2)}%
                    </span>
                  </p>
                  <p>
                    Price Change 30d:{" "}
                    <span
                      style={{
                        color:
                          coin.market_data.price_change_percentage_30d < 0
                            ? "#f00606"
                            : "#13c783",
                      }}
                    >
                      {coin.market_data.price_change_percentage_30d.toFixed(2)}%
                    </span>
                  </p>
                  <p>
                    Price Change 1y:{" "}
                    <span
                      style={{
                        color:
                          coin.market_data.price_change_percentage_1y < 0
                            ? "#f00606"
                            : "#13c783",
                      }}
                    >
                      {coin.market_data.price_change_percentage_1y.toFixed(2)}%
                    </span>
                  </p>

                  <p>High 24h: {coin.market_data.high_24h.usd}$</p>
                  <p>Low 24h: {coin.market_data.low_24h.usd}$</p>
                </div>
              </div>

              <p className={Styles.coinDescription}>{coin.description.en}</p>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default Coin;

export async function getServerSideProps(context) {
  const { id } = context.query;

  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}
  `);

  const data = await res.json();

  return {
    props: {
      coin: data,
    },
  };
}
