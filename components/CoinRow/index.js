/* eslint-disable @next/next/no-img-element */
import Styles from "./Coins.module.css";
import Link from "next/link";

const CoinRow = ({
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
        <div className={Styles.coinContainer}>
          <div className={Styles.coin_row}>
            <div className={Styles.coin}>
              <img src={image} alt={name} className={Styles.coin_img} />
              <h4 className={Styles.coin_h4} id="lg-screen-only">
                {name}
              </h4>
              <p className={Styles.coin_symbol}>{symbol}</p>
            </div>
            <div className={Styles.coin_data}>
              <p className={Styles.coin_price}>${price}</p>
              <p className={Styles.coin_volume} id="lg-screen-only">
                ${volume.toLocaleString()}
              </p>
              <div className={Styles.coinPercent}>
                {priceChange < 0 ? (
                  <p className={Styles.red}>{priceChange.toFixed(2)}%</p>
                ) : (
                  <p className={Styles.green}>{priceChange.toFixed(2)}%</p>
                )}
              </div>
              <p className={Styles.coin_marketcap} id="lg-screen-only">
                Mkt Cap: ${marketcap.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default CoinRow;
