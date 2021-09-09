import nc from "next-connect";
import Order from "../../../models/Order";
import { isAuth } from "../../../utils/auth";
import db from "../../../utils/db";
import { onError } from "../../../utils/error";

const handler = nc({
  onError,
});
handler.use(isAuth);

handler.post(async (req, res) => {
  await db.connect();
  console.log("REQUEST: ", req.body);
  const newOrder = new Order({
    ...req.body,
    user: req.user._id,
  });
  try {
    const order = await newOrder.save();
    console.log(order);
    res.status(201).send(order);
  } catch {
    console.log("err");
  }
});

export default handler;
