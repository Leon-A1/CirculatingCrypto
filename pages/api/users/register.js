import nc from "next-connect";
import bcrypt from "bcryptjs";
import User from "../../../models/User";
import db from "../../../utils/db";
import { signToken } from "../../../utils/auth";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const newUser = new User({
    // name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    isAdmin: false,
    coins: [
      {
        name: "usd-coin",
        symbol: "usdc",
        balanceAmount: 100000,
        image:
          "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
      },
      {
        name: "bitcoin",
        symbol: "btc",
        balanceAmount: 0.1,
        image:
          "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
      },
      {
        name: "ethereum",
        symbol: "eth",
        balanceAmount: 2,
        image:
          "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
      },
    ],
  });
  const user = await newUser.save();
  await db.disconnect();

  const token = signToken(user);
  res.send({
    token,
    _id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
    coins: user.coins,
    transactions: user.transactions,
  });
});

export default handler;
