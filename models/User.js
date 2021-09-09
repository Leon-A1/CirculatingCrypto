import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, default: "userName" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    USDBalance: { type: Number, required: true, default: 0 },
    BTCBalance: { type: Number, default: 0 },
    ETHBalance: { type: Number, default: 0 },
    isAdmin: { type: Boolean, required: true, default: false },
    balances: {
      type: Array,
      default: [
        { symbol: "USD", amount: 10000 },
        { symbol: "BTC", amount: 0.001 },
        { symbol: "ETH", amount: 0.1 },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
