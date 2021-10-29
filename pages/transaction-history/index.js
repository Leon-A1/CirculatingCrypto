import Layout from "../../components/Layout";
import DashboardLayout from "../../components/DashboardLayout";
import { Store } from "../../utils/Store";
import Link from "next/link";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Styles from "./TransactionHistory.module.css";
import { ArrowRightAltOutlined } from "@material-ui/icons";

const TransactionHistory = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [userTransactions, setUserTransactions] = useState();

  useEffect(() => {
    const getTransactionsData = async () => {
      try {
        const Backend_res = await axios.get(`/api/users/exchange-transaction`, {
          headers: { authorization: `Bearer ${userInfo}` },
        });
        setUserTransactions(Backend_res.data);
        // console.log("BACKEND RESPONSE: ", Backend_res.data[0].substring(4, 10));
        console.log(
          "BACKEND RESPONSE: ",
          Backend_res.data[0].createdAt.substring(5, 10)
        );
      } catch (error) {
        console.log(error);
      }
    };
    if (userInfo) {
      getTransactionsData();
    }
  }, [userInfo]);
  return (
    <Layout>
      <DashboardLayout>
        {userInfo ? (
          <div className={Styles.transactionsContainer}>
            <div className={Styles.innerContainer}>
              <h2>Transaction history</h2>
              <div className={Styles.transactionList}>
                {userTransactions &&
                  userTransactions.map((transaction) => {
                    return (
                      <Link
                        key={transaction._id}
                        href={`/transaction/${transaction._id}`}
                        passHref
                      >
                        <div className={Styles.transactionRow}>
                          <p>{transaction.createdAt.substring(5, 10)}</p>
                          <p>{transaction.exchangeFrom}</p>
                          <ArrowRightAltOutlined />
                          <p>{transaction.exchangeTo}</p>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>
        ) : (
          <div className={Styles.goToLoginContainer}>
            <p>
              Must{" "}
              <Link href="/login">
                <a className={Styles.redirectLink}> login </a>
              </Link>
              to access transaction history.
            </p>
          </div>
        )}
      </DashboardLayout>
    </Layout>
  );
};

export default TransactionHistory;
