import Layout from "../../components/Layout";
import DashboardLayout from "../../components/DashboardLayout";
import { Store } from "../../utils/Store";
import Link from "next/link";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Styles from "./Transaction.module.css";
import { ArrowDownward } from "@material-ui/icons";
import { useRouter } from "next/router";

const Transaction = () => {
  const router = useRouter();
  const { id } = router.query;
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [transaction, setTransaction] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const getTransactionsData = async () => {
      try {
        const Backend_res = await axios.get(`/api/users/exchange-transaction`, {
          headers: { authorization: `Bearer ${userInfo}` },
        });

        let current_transaction = Backend_res.data.find(
          (transaction) => transaction._id === id
        );
        setTransaction(current_transaction);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    if (userInfo) {
      getTransactionsData();
    }
  }, [userInfo, id]);
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
              <div className={Styles.transactionContainer}>
                <div className={Styles.innerContainer}>
                  {transaction ? (
                    <div>
                      <div className={Styles.topInfoBar}>
                        <h6>{transaction._id.substring(0, 8)}</h6>
                        <h6>{transaction.createdAt.substring(0, 19)}</h6>
                      </div>
                      <div className={Styles.container}>
                        <p>From:</p>
                        <p>{transaction.exchangeFrom}</p>
                        <p>{transaction.exchangeFromAmount}</p>
                      </div>
                      <div className={Styles.arrowContainer}>
                        <ArrowDownward />
                      </div>
                      <div className={Styles.container}>
                        <p>To:</p>

                        <p>{transaction.exchangeTo}</p>
                        <p>{transaction.exchangeToAmount}</p>
                      </div>
                      <div className={Styles.amountContainer}>
                        <p>Amount in USD:</p>

                        <p>{transaction.exchangeAmountInUSD.toFixed(2)}$</p>
                      </div>
                    </div>
                  ) : (
                    <p>Transaction not found.</p>
                  )}
                </div>
              </div>
            ) : (
              <div className={Styles.goToLoginContainer}>
                <p>
                  Must{" "}
                  <Link href="/login">
                    <a className={Styles.redirectLink}> login </a>
                  </Link>
                  to access transaction page.
                </p>
              </div>
            )}
          </>
        )}
      </DashboardLayout>
    </Layout>
  );
};

export default Transaction;
