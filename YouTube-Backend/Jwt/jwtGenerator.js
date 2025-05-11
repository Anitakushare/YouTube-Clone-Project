import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateJwtToken = (data) => {
    return jwt.sign(
      {
        id: data._id,
        email: data.email,
        userName: data.userName
      },
     process.env.SECRET_KEY, // use .env in real projects
      { expiresIn: "25h" }
    );
  };
  