// seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js"; 
import { MONGODB_URL } from "../constants.js";

dotenv.config();


const seedUsers = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Connected to DB");

    // Clear existing users
    await User.deleteMany();

    const hashedPassword = await bcrypt.hash("test123", 10);

    const users = Array.from({ length: 20 }).map((_, index) => ({
      username: `User ${index + 1}`,
      email: `user${index + 1}@example.com`,
      password: hashedPassword,
      totalPoints: Math.floor(Math.random() * 100), // optional random points
    }));

    await User.insertMany(users);
    console.log("Inserted 20 sample users");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedUsers();