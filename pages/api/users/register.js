import nc from "next-connect";
import bcrypt from "bcryptjs";
import User from "../../../models/User";
import db from "../../../utils/db";
import { signToken } from "../../../utils/auth";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    res.status(400).send({ message: "Email address is already registered" });
  } else {
    try {
      const newUser = new User({
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
      console.log("NEW USER: ", user);
      await db.disconnect();
      const token = signToken(user);
      res.send({
        token,
      });
    } catch (e) {
      res.send({ message: "Something went wrong please try again..." });
    }
  }
});

export default handler;
