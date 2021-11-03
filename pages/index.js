/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Layout from "../components/Layout";
import Styles from "../styles/LandingPage.module.css";
import CoinList from "../components/CoinList";

export default function Home({ filteredCoins }) {
  const allCoins = filteredCoins.filter((coin) =>
    coin.name.toLowerCase().includes("")
  );
  return (
    <Layout>
      <div className={Styles.hero}>
        <div className={Styles.heroContent}>
          <h1>Circulating Crypto</h1>
          <img
            src="./images/hero_svg.svg"
            alt="hero"
            className={Styles.heroImg}
          />
          <div className={Styles.coinsPreview}>
            <CoinList filteredCoins={allCoins} />
          </div>
          <Link href="/dashboard">
            <a>
              <button className="button">Browse coins</button>
            </a>
          </Link>
        </div>
      </div>

      <div className={Styles.homepageAdContent}>
        <p>
          "What is needed is an electronic payment system based on cryptographic
          proof instead of trust, allowing any two willing parties to transact
          directly with each other without the need for a trusted third party.
          <br /> Transactions that are computationally impractical to reverse
          would protect sellers from fraud, and routine escrow mechanisms could
          easily be implemented to protect buyers."
        </p>
        <br />

        <p style={{ textAlign: "right" }}>
          <strong> Satoshi Nakamoto</strong>
        </p>
        <img src="./images/btc_svg.svg" alt="btc" className={Styles.btcImg} />
      </div>
      <div className={Styles.homepageSVGBreak}>
        <img
          src="./images/rotating-ethereum.gif"
          alt="rotating-eth"
          className={Styles.rotatingEthImg}
        />
      </div>
      <div className={Styles.homepageAdContent}>
        <p>
          "Satoshi Nakamoto's development of Bitcoin in 2009 has often been
          hailed as a radical development in money and currency, being the first
          example of a digital asset which simultaneously has no backing or
          intrinsic value and no centralized issuer or controller.
          <br /> However, another - arguably more important - part of the
          Bitcoin experiment is the underlying blockchain technology as a tool
          of distributed consensus, and attention is rapidly starting to shift
          to this other aspect of Bitcoin.
          <br /> Commonly cited alternative applications of blockchain
          technology include using on-blockchain digital assets to represent
          custom currencies and financial instruments (colored coins), the
          ownership of an underlying physical device (smart property),
          non-fungible assets such as domain names (Namecoin), as well as more
          complex applications involving having digital assets being directly
          controlled by a piece of code implementing arbitrary rules (smart
          contracts) or even blockchain-based decentralized autonomous
          organizations (DAOs).
          <img src="./images/eth_svg.svg" alt="eth" className={Styles.ethImg} />
          <br /> What Ethereum intends to provide is a blockchain with a
          built-in fully fledged Turing-complete programming language that can
          be used to create "contracts" that can be used to encode arbitrary
          state transition functions, allowing users to create any of the
          systems described above, as well as many others that we have not yet
          imagined, simply by writing up the logic in a few lines of code."
        </p>
        <br />
        <p style={{ textAlign: "right" }}>
          <strong>Vitalik Buterin</strong>
        </p>
      </div>
      <div className={Styles.homepageAdContent}>
        <img
          src="./images/portfolio_svg.svg"
          alt="portfolio"
          className={Styles.portfolioImg}
        />
      </div>
    </Layout>
  );
}
export const getServerSideProps = async () => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false"
  );

  const filteredCoins = await res.json();

  return {
    props: {
      filteredCoins,
    },
  };
};
