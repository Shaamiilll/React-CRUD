import Admin from "../model/AdminModel.js";
import jwt from "jsonwebtoken";

export const AdminLogin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email: email });
  if (!admin) {
    res.json({
      error: "invalid email",
    });
  }
  if (password != admin.password) {
    res.json({
      error: "invalid Password",
    });
  }
  if (password === admin.password) {
    jwt.sign(
      { email: admin.email, id: admin._id },
      process.env.JWT_SECRET,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("AdminTocken", token).json(admin);
      }
    );
  }
};

export const checkAdminAuth = async (req,res) => {
    try {
        const token = req.cookies.adminToken
        console.log(token);
        const key = process.env.JWT_SECRET;
        if(!token){
            console.log("no Token");
        }else{
            const verified = jwt.verify(token , key)
            return res.json({message : true})
        }
    } catch (error) {
        console.log(error);
    }
}