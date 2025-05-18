import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//generate jwt token for user authentication
export const generateJwtToken = (data) => {
    return jwt.sign(
      {
        id: data._id,
        email: data.email,
        userName: data.userName
      },
     process.env.SECRET_KEY, 
      { expiresIn: "25h" }
    );
  };
  