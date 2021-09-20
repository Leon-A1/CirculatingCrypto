/* eslint-disable @next/next/no-img-element */
import styles from "./Coins.module.css";
import Link from "next/link";

const Coins = ({
  name,
  price,
  symbol,
  marketcap,
  volume,
  image,
  priceChange,
  id,
}) => {
  return (
    <Link href="/coin/[id]" as={`/coin/${id}`}>
      <a>
        <div className={styles.coinContainer}>
          <div className={styles.coin_row}>
            <div className={styles.coin}>
              <img src={image} alt={name} className={styles.coin_img} />
              <h4 className={styles.coin_h4} id="lg-screen-only">
                {name}
              </h4>
              <p className={styles.coin_symbol}>{symbol}</p>
            </div>
            <div className={styles.coin_data}>
              <p className={styles.coin_price}>${price}</p>
              <p className={styles.coin_volume} id="lg-screen-only">
                ${volume.toLocaleString()}
              </p>
              <div className={styles.coinPercent}>
                {priceChange < 0 ? (
                  <p className={styles.red}>{priceChange.toFixed(2)}%</p>
                ) : (
                  <p className={styles.green}>{priceChange.toFixed(2)}%</p>
                )}
              </div>
              <p className={styles.coin_marketcap} id="lg-screen-only">
                Mkt Cap: ${marketcap.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Coins;
