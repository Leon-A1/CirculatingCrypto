import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, default: "userName" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    balances: {
      type: Array,
      default: [
        { symbol: "usd-coin", amount: 10000 },
        { symbol: "bitcoin", amount: 0.001 },
        { symbol: "ethereum", amount: 0.1 },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
