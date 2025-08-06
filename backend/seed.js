// seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const existing = await User.findOne({ username: "admin" });
if (existing) {
  console.log("Admin user already exists.");
  process.exit();
}

const user = new User({
  username: "admin",
  password: "admin123",
});

await user.save();
console.log("✅ Admin user created: admin / admin123");

process.exit();
