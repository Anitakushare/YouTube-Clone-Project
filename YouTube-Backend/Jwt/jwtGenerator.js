import jwt from "jsonwebtoken"

// Middleware to authenticate JWT token
export const jwtAuth = (req, res, next) => {
  const Authorization = req.headers.authorization;

  if (!Authorization) return res.status(401).json("Authorization not found!Only Authorize user can update or delete cartItem");

  const token = Authorization.split(" ")[1];
  if (!token) return res.status(401).json("Token not found");

  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

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
  