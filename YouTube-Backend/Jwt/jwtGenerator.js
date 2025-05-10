import jwt from "jsonwebtoken";

export const generateJwtToken = (data) => {
    return jwt.sign(
      {
        id: data._id,
        email: data.email,
        userName: data.userName
      },
      "ANITAKUSHAREWEBDEVELOPER", // use .env in real projects
      { expiresIn: "1h" }
    );
  };
  