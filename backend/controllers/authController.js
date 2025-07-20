import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { JWT_SECRET } from "../constants.js";


console.log(JWT_SECRET);
//Register User 

export const register = async (req ,res)=>{
    const {username , email , password} = req.body;
    const existing  = await  User.findOne({email});
    if(existing) return res.status(400).json({
        message:"User Already Exist"
    });

    const hashedPassword = await bcrypt.hash(password , 10);
    const user = new User({ username , email , password:hashedPassword});
    if(!user) return res.status(404).json({message:"Something Went Wrong"});
    await user.save();
    res.status(200).json({message: "User Created"});
}

export const login = async (req , res) =>{
  console.log("Hit Login");
    const {email , password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(404).json({message:"Invalid Credentials"});

    const isMatch = await bcrypt.compare(password , user.password);
    if(!isMatch) return res.status(400).json({message:"Invalid password"});
    const token = jwt.sign({id: user._id}, JWT_SECRET,{expiresIn:"1d"});
    res.json({token, user});
}


export const protect = (req, res, next) => {
  console.log(req.headers);
    const auth = req.headers.authorization;
    console.log(auth);
    if (!auth?.startsWith("Bearer ")) return res.status(401).json({ message: "No token" });
  
    try {
      const token = auth.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch {
      res.status(401).json({ message: "Token invalid" });
    }
  };