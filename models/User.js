import mongoose from "mongoose";

const coinSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    id: { type: String },
    name: { type: String },
    symbol: { type: String },
    image: { type: String },
    currentPrice: { type: Number },
    balanceAmount: { type: Number },
  },
  {
    timestamps: true,
  }
);

const transactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    exchangeFrom: { type: String },
    exchangeFromAmount: { type: Number },
    exchangeTo: { type: String },
    exchangeToAmount: { type: Number },
    exchangeAmountInUSD: { type: Number },
  },
  {
    timestamps: true,
  }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, default: "userName" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    transactions: [transactionSchema],
    coins: [coinSchema],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
