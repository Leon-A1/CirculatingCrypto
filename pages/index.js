/* eslint-disable @next/next/no-img-element */
import NextLink from "next/link";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Store } from "../utils/Store";
import Styles from "../styles/LandingPage.module.css";

export default function Home() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  return (
    <Layout>
      <div className={Styles.hero}>
        <div className={Styles.heroContent}>
          <h1>Circulating Crypto</h1>
        </div>
      </div>
      <div className={Styles.homepageAdContent}>
        <p>
          "What is needed is an electronic payment system based on cryptographic
          proof instead of trust, allowing any two willing parties to transact
          directly with each other without the need for a trusted third party.
          Transactions that are computationally impractical to reverse would
          protect sellers from fraud, and routine escrow mechanisms could easily
          be implemented to protect buyers. "
        </p>
        <p style={{ textAlign: "right" }}>Satoshi Nakamoto</p>
      </div>
      <div className={Styles.homepageSVGBreak}></div>
      <div className={Styles.homepageAdContent}>
        <p>
          "Satoshi Nakamoto's development of Bitcoin in 2009 has often been
          hailed as a radical development in money and currency, being the first
          example of a digital asset which simultaneously has no backing or
          intrinsic value and no centralized issuer or controller. However,
          another - arguably more important - part of the Bitcoin experiment is
          the underlying blockchain technology as a tool of distributed
          consensus, and attention is rapidly starting to shift to this other
          aspect of Bitcoin. Commonly cited alternative applications of
          blockchain technology include using on-blockchain digital assets to
          represent custom currencies and financial instruments (colored coins),
          the ownership of an underlying physical device (smart property),
          non-fungible assets such as domain names (Namecoin), as well as more
          complex applications involving having digital assets being directly
          controlled by a piece of code implementing arbitrary rules (smart
          contracts) or even blockchain-based decentralized autonomous
          organizations (DAOs). What Ethereum intends to provide is a blockchain
          with a built-in fully fledged Turing-complete programming language
          that can be used to create "contracts" that can be used to encode
          arbitrary state transition functions, allowing users to create any of
          the systems described above, as well as many others that we have not
          yet imagined, simply by writing up the logic in a few lines of code."
        </p>
        <p style={{ textAlign: "right" }}>Vitalik Buterin</p>
      </div>
      <div className={Styles.homepageAdContent}>
        <img
          style={{
            width: "100%",
            maxWidth: "30rem",
            margin: "auto",
            display: "block",
          }}
          src="/images/homepage_blockchain.png"
        ></img>
      </div>
    </Layout>
  );
}
