import { User } from "../models/userModel.js";
import { comaparePassword, hashPassword } from "../helpers/encryptHelper.js";
import { match } from "node:assert";
import { generateToken } from "../helpers/tokenHelper.js";

export const registerUser = async (req, res) => {
  try {
    const newUser = req.body;
    newUser.password = hashPassword(newUser.password);

    const existingUser = await User.findOne({ email: newUser.email });
    if (existingUser) {
      return res.send({
        status: "error",
        message: "User already exists",
      });
    }
    const data = await User.insertOne(newUser);
    return res.send({
      status: "success",
      message: "User registered successfully",
      data,
    });
  } catch (error) {
    return res.send({
      status: "error",
      message: "Error registering user",
    });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginData = await User.findOne({ email });
    if (loginData) {
      const matchpassword = comaparePassword(password, loginData.password);
      if (matchpassword) {
        // Generate token and send response
        const payload = { email: loginData.email };
        const token = generateToken(payload);
        return res.send({
          status: "success",
          message: "User logged in successfully",
          data: loginData,
          token,
        });
      } else {
        return res.send({
          status: "error",
          message: "Invalid credentials",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.send({
      status: "error",
      message: "Error logging in user",
    });
  }
};

// Get all users detials

export const getUserDetials = async (req, res) => {
  return res.send({
    status: "success",
    message: "User details fetched successfully",
    data: req.user,
  });
};
