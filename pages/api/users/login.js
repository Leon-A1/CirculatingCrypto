import nc from "next-connect";
import bcrypt from "bcryptjs";
import User from "../../../models/User";
import db from "../../../utils/db";
import { signToken } from "../../../utils/auth";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const user = await User.findOne({ email: req.body.email });
  // console.log(user);
  await db.disconnect();
  console.log("PASSWORD:", req.body.password);
  console.log("user password:", user.password);
  console.log(bcrypt.compareSync(req.body.password, user.password));

  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = await signToken(user);
    console.log("RESPONSE TOKEN:", token);

    res.send({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      USDBalance: user.USDBalance,
      balances: user.balances,
    });
  } else {
    res.status(401).send({ message: "Invalid email or password" });
  }
});

export default handler;
