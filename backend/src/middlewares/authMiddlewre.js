import { User } from "../models/userModel.js";
import { verifyToken } from "../helpers/tokenHelper.js";

export const authMiddleware = async (req, res, next) => {
  try {
    //1. Get the token from header
    const token = req.headers.authorization;

    //2. verify the token
    if (token) {
      const tokenData = verifyToken(token);
      console.log(tokenData);
      //3 find the user from the token payload
      const user = await User.findOne({ email: tokenData.email });
      if (user) {
        req.user = user;
        user.password = "";
        return next();
      } else {
        return res.status(401).send({
          status: "error",
          message: "User not found! ",
        });
      }
    } else {
      return res.status(401).send({
        status: "error",
        message: "Token not found! ",
      });
    }
  } catch (error) {
    console.log(error);
    if (error.message.includes("jwt expired")) {
      return res.status(401).send({
        status: "error",
        message: error.message,
      });
    } else {
      return res.status(401).send({
        status: "error",
        message: "Token verification failed! ",
      });
    }
  }
};
