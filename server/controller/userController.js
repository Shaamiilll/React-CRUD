import User from "../model/userModel.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";

export const RegisterUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Checking the name was entered
    if (!name) {
      return res.json({
        error: "name is required",
      });
    }

    // Checking the passWord
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be atleast 6 character long",
      });
    }

    // Checking the Email
    const Exist = await User.findOne({ email: email });
    if (Exist) {
      return res.json({
        error: "Email is taken already",
      });
    }

    // Checking the Email
    if (!phone) {
      return res.json({
        error: "Phone number is required",
      });
    }
    const hashedPassword = await hashPassword(password);
    // Saving User into DataBase
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
        return res.json({
            error :"No user Found"
        })
    }
   
   const match = await comparePassword(password , user.password)
   if(match){
    res.json("Passwords match")
   }
  } catch (error) {
    console.log(error);
  }
};
