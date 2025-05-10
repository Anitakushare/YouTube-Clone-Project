import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import userModel from "../Model/user.model.js";
import { generateJwtToken } from "../Jwt/jwtGenerator.js";

export const addUser=async (req,res)=>{
    try{
    const {userName,avatar,email,password}=req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
  const hashPass=await bcrypt.hash(password,10);
  const user= await userModel.create({userName,avatar,email,password:hashPass});
  const token = generateJwtToken(user);
    res.status(201).json({message:"User Added successfully",user,token});
}catch(err){

    console.log("Error Adding User",err.message);
    res.status(500).json({message:"Internal Server Error"})
}
};

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
 
  
      const userInfo = await userModel.findOne({ email });
      
      if (!userInfo) {
        return res.status(404).json({ message: "User not found" });
      }
      const validatePass = await bcrypt.compare(password.trim(),userInfo.password);
      console.log(validatePass)
     
      if (!validatePass) {
        return res.status(401).json({ message: "Incorrect password" });
      }
  
      const token = generateJwtToken(userInfo);
  
      return res.status(200).json({
        message: "Login successful",
        token: token,
        user: {
          userName: userInfo.userName,
          avatar:userInfo.avatar,
          email: userInfo.email
        }
      });
  
    } catch (err) {
      console.log("Error to Login:", err.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };