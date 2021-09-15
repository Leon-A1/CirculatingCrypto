import mongoose from "mongoose";
import nc from "next-connect";
import { onError } from "../../../utils/error";
import db from "../../../utils/db";
import User from "../../../models/User";
import { isAuth } from "../../../utils/auth";
import { signToken } from "../../../utils/auth";

const handler = nc();
handler.use(isAuth);

// const handler = nextConnect({
//   onError,
// });

handler.post(async (req, res) => {
  console.log("recieved new transaction request");
  console.log("REQUEST: ", req.body);
  await db.connect();
  const user = await User.findById(req.user._id);
  if (user) {
    console.log("Creating new transaction in db");

    const transaction = {
      user: mongoose.Types.ObjectId(user._id),
      exchangeFrom: req.body.exchangeFromSymbol,
      exchangeFromAmount: req.body.exchangeFromAmount,
      exchangeTo: req.body.exchangeToSymbol,
      exchangeToAmount: req.body.exchangeToAmount,
      exchangeAmountInUSD: req.body.amountToTradeInUSD,
    };
    user.transactions.push(transaction);

    // Check if there is a from coin in existing balance
    const existing_from_balance = user.coins.find(
      (coin) => coin.symbol === req.body.exchangeFromSymbol
    );
    if (existing_from_balance) {
      // console.log("found existing_from_balance coin:", existing_from_balance);

      await User.updateOne(
        { _id: req.user._id, "coins.symbol": existing_from_balance.symbol },
        {
          $inc: {
            "coins.$.balanceAmount": -parseInt(req.body.exchangeFromAmount),
          },
        }
      );
    }

    // Check if there is  a to coin in  existing balance
    const existing_to_balance = user.coins.find(
      (coin) => coin.symbol === req.body.exchangeToSymbol
    );
    if (existing_to_balance) {
      // console.log("found existing_to_balance coin:", existing_from_balance);

      await User.updateOne(
        { _id: req.user._id, "coins.symbol": existing_to_balance.symbol },
        {
          $inc: {
            "coins.$.balanceAmount": parseInt(req.body.exchangeToAmount),
          },
        }
      );
    } else {
      const coin = {
        user: mongoose.Types.ObjectId(req.user._id),
        symbol: req.body.exchangeToSymbol,
        balanceAmount: req.body.exchangeToAmount,
        image: req.body.imageToCoin,
      };
      user.coins.push(coin);
    }

    // save user changes

    await user.save();
    await db.disconnect();
    // console.log(user);

    // await db.connect();
    // const updatedUser = await User.findById(req.user._id);
    // await db.disconnect();

    // const token = signToken(user);
    // res.send({
    //   token,
    // });
    res.send({ message: "transaction confirmed" }, 200);
  } else {
    await db.disconnect();
    res.status(404).send({ message: "User Not Found" });
  }
});

handler.get(async (req, res) => {
  db.connect();
  const user = await User.findById(req.query.id);
  db.disconnect();
  if (user) {
    res.send(user.transactions);
  } else {
    res.status(404).send({ message: "User transactions not found" });
  }
});
export default handler;
