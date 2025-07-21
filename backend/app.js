import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import dotenv from "dotenv"; 
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { protect } from "./controllers/authController.js";
import { PORT } from "./constants.js";

const app = express();
dotenv.config();

connectDB();

// app.use(cors());
app.use(cors({
  origin: '*', // allow from everywhere
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());
app.use(helmet());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later."
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", protect, userRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));