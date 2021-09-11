// /api/products/:id/reviews
import mongoose from "mongoose";
import nextConnect from "next-connect";
import { onError } from "../../../utils/error";
import db from "../../../utils/db";
import User from "../../../models/User";
import { isAuth } from "../../../utils/auth";
import { signToken } from "../../../utils/auth";

const handler = nextConnect({
  onError,
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

handler.use(isAuth).post(async (req, res) => {
  // console.log("recieved new transaction request");
  await db.connect();
  const user = await User.findById(req.user._id);
  if (user) {
    // console.log("Creating new transaction in db", req.body.exchangeFromAmount);

    const transaction = {
      user: mongoose.Types.ObjectId(req.query.id),
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
        { _id: req.query.id, "coins.symbol": existing_from_balance.symbol },
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
        { _id: req.query.id, "coins.symbol": existing_to_balance.symbol },
        {
          $inc: {
            "coins.$.balanceAmount": parseInt(req.body.exchangeToAmount),
          },
        }
      );
    } else {
      const coin = {
        user: mongoose.Types.ObjectId(req.query.id),
        symbol: req.body.exchangeToSymbol,
        balanceAmount: req.body.exchangeToAmount,
        image: req.body.imageToCoin,
      };
      user.coins.push(coin);
    }

    // save user changes

    await user.save();
    await db.disconnect();
    console.log(user);

    await db.connect();
    const updatedUser = await User.findById(req.query.id);
    await db.disconnect();
    console.log(updatedUser);

    const token = signToken(updatedUser);
    res.send({
      token,
      _id: updatedUser._id,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      coins: updatedUser.coins,
      transactions: updatedUser.transactions,
    });
    // res.status(201).send({
    //   message: "Exchange transaction submitted",
    // });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "User Not Found" });
  }
});

export default handler;
