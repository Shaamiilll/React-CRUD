import User from "../model/userModel.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import jwt from "jsonwebtoken";
import cloudinaryUploadImage from "../helpers/cloudinary.js";

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
        error: "No user Found",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({
        error: "Password do not match!",
      });
    }
    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const Logout = (req, res) => {
  try {
    res.cookie("token", "", { expires: new Date(0), httpOnly: true });
    res.status(200).json({ success: "Logout successful" });
  } catch (error) {
    console.log(error);
  }
};

export const AddUser = async (req, res) => {
  try {
    console.log(req.body);

    const { firstname, email, password, phone } = req.body;
    let pattern = "[A-Za-z0-9][@](gmail)[.](com)$";

    const Exist = await User.findOne({ email: email });

    if (Exist) {
      return res.json({
        error: "Email already Exist",
      });
    }

    if (!firstname) {
      return res.json({
        error: "Firstname is required",
      });
    }
    if (!email) {
      return res.json({
        error: "Email is required",
      });
    }
    if (!password) {
      return res.json({
        error: "Password is required",
      });
    }
    if (!phone) {
      return res.json({
        error: "Phone is required",
      });
    }
    const randomNumber = Math.floor(Math.random() * 101);
    const image = `https://randomuser.me/api/portraits/men/${randomNumber}.jpg`
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name: firstname,
      email,
      password: hashedPassword,
      phone,
      image:image
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

export const GetUser = async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

export const DeleteUser = async (req, res) => {
  try {
    const user = await User.deleteOne({ _id: req.params.id });
  } catch (error) {
    console.log(error);
  }
};
export const UpdateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({ _id: id });
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};
export const EditUser = async (req, res) => {

  try {
    const { email, firstname, phone, userId , image } = req.body;
 
   console.log(image);
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { name: firstname, email, phone ,image  } },
      { new: true }
    );

    jwt.sign(
      { email: updatedUser.email, id: updatedUser._id, name: updatedUser.name },
      process.env.JWT_SECRET,
      {},
      (err, token) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Failed to generate token" });
        }
        res.cookie("token", token).json(updatedUser);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

