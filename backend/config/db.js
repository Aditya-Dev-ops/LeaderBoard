import mongoose from "mongoose";
import { MONGODB_URL } from "../constants.js";

const connectDb = async()=>{
   try {
    await mongoose.connect(MONGODB_URL);
    console.log("MongoDB Connected Successfully");
   } catch (error) {
    console.error("MongoDB connection Error:", error);
    process.exit(1);
   } 
}

export default connectDb;
