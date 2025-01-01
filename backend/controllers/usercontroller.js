import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import genratejwt from "../utils/genrateJwtToken.js";

dotenv.config();

export const userRegisterHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    let user = await User.findOne({ email }).select("-password");

    if (user) {
      return res.status(400).json({
        message: "User already has an account",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });
    genratejwt(user._id, res);
    res.status(201).json({
      user,
      message: "User is registered",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const userLoginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        massage: "all fields are required",
      });
    }

    const user = await User.findOne({ email }).select("-password");
    if (!user) {
      return res.status(402).json({
        massage: "user doesn't exits with this email ",
      });
    }
    const status = await bcrypt.compare(password, user.password);
    if (!status) {
      return res.status(402).json({
        massage: "wrong email or password",
      });
    }
    genratejwt(user._id, res);
    res.status(200).json({
      user,
      massage: "Logged in !",
    });
  } catch (error) {
    res.status(500).json({
      massage: "something went wrong",
    });
  }
};

export const myProfileFetchHandler = async (req, res) => {
  try {
    const userid = req.user._id;
    const user = await User.findById(userid).select("-password");
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      massage: "something went wrong",
    });
  }
};

export const LogOutHandler = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({
      massage: "Logged out !",
    });
  } catch (error) {
    res.status(500).json({
      massage: "something went wrong",
    });
  }
};

export const userProfileFetchHandler = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const user = await User.findById(id).select("-password");
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(404).json({
      massage: "something went wrong",
    });
  }
};
