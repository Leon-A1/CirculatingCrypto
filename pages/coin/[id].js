import Layout from "../../components/Layout";
import styles from "./Coin.module.css";
import Image from "next/image";

const Coin = ({ coin }) => {
  return (
    <Layout>
      <div className={styles.coinPage}>
        <div className={styles.coin_container}>
          <div className={styles.imgWrapper}>
            <Image
              src={coin.image.large}
              alt={coin.name}
              className={styles.coinImage}
              width="100%"
              height="100px"
              objectFit="cover"
              styles={{ display: "block", margin: "auto" }}
            />
          </div>
          <h1 className={styles.coin_name}>{coin.name}</h1>
          <h2 className={styles.coin_ticker}>{coin.symbol}</h2>
          {/* Coin details flex table */}
          <div className={styles.coinDetails}>
            <div>
              <p>Current price: {coin.market_data.current_price.usd}$</p>
              <p>Circulating supply: {coin.market_data.circulating_supply}</p>
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

          <p className={styles.coinDescription}>{coin.description.en}</p>
        </div>
      </div>
    </Layout>
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
