import mongoose from "mongoose";

function dbConnect() {
  mongoose
    .connect(process.env.MONGO_URL)
    .then((result) => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log(err , "db");
    });
}

export default dbConnect;
