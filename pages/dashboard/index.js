import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import CoinList from "../../components/CoinList";
import SearchBar from "../../components/SearchBar";
import useSWR from "swr";

export default function Dashboard({ filteredCoins }) {
  const [topCoins, setTopCoins] = useState([]);
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false",
    fetcher,
    {
      refreshInterval: 1000,
    }
  );
  if (error) {
    console.log("Fetcher ERROR: ", error);
  }

  useEffect(() => {
    setTopCoins(data);
  }, [topCoins, data]);

  const [search, setSearch] = useState("");
  const allCoins = filteredCoins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value.toLowerCase());
  };
  return (
    <Layout>
      <DashboardLayout>
        <div>
          <div style={{ marginBottom: "15vh" }}>
            <SearchBar
              type="text"
              placeholder="Search"
              onChange={handleChange}
            />
            <div style={{ borderTop: "solid 1px rgba(112, 112, 112, 0.15)" }}>
              <CoinList filteredCoins={topCoins ? topCoins : allCoins} />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </Layout>
  );
}

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
