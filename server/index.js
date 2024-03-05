import "dotenv/config";
import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import dbConnect from "./config/config.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();

// Middleware
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Connect to database
dbConnect();

// Routes
app.use("/", userRouter);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
