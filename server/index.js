import "dotenv/config";
import express from "express";
import cors from "cors";
import userRouter from './routes/userRoutes.js'; 
import dbConnect from "./config/config.js";



const app = express();
const port = process.env.PORT || 5000;
app.use(express.json())
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
dbConnect()

app.use("/", userRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
