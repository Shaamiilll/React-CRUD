import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
    },
    password: {
      type: String,
      required: true,
    },
    image : {
     type : String,
     default : null
    }
  },
);

const userModel = mongoose.model("user", userSchema);
export default userModel;
