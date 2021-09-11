import Head from "next/head";
import Navbar from "../components/Global/Navbar";
import Footer from "../components/Global/Footer";

export default function Layout({ title, description, children }) {
  return (
    <div>
      <Head>
        <title>{title ? `${title} - CC` : "Circulating Crypto"}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <Navbar />
      <div style={{ minHeight: "75vh", marginTop: "7.5vh" }}>{children}</div>
      <Footer />
    </div>
  );
}
