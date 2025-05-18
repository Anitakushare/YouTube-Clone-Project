import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import userModel from "../Model/user.model.js";
import { generateJwtToken } from "../Jwt/jwtGenerator.js";
//Add new user to batabase
export const addUser=async (req,res)=>{
    try{
    const {userName,avatar,email,password}=req.body;
    const existingUser = await userModel.findOne({ email });
    //Check email is already exist
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    //hashed the user password with bcrypt
  const hashPass=await bcrypt.hash(password,10);
  const user= await userModel.create({userName,avatar,email,password:hashPass});
    res.status(201).json({message:"User Added successfully",user});
}catch(err){

    console.log("Error Adding User",err.message);
    res.status(500).json({message:"Internal Server Error"})
}
};
//Login user function
export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
 
  
      const userInfo = await userModel.findOne({ email }).populate("channels");
      
      if (!userInfo) {
        return res.status(404).json({ message: "User not found" });
      }
      const validatePass = await bcrypt.compare(password.trim(),userInfo.password);
    
     
      if (!validatePass) {
        return res.status(401).json({ message: "Incorrect password" });
      }
  //generate jwt token for user 
      const token = generateJwtToken(userInfo);
  //login successfull
      return res.status(200).json({
        message: "Login successful",
        token: token,
        user: {
          userId:userInfo.id,
          userName: userInfo.userName,
          avatar:userInfo.avatar,
          email: userInfo.email,
          channels:userInfo.channels
        }
      });
  
    } catch (err) {
      console.log("Error to Login:", err.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };