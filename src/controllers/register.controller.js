import userModel from "../models/user.model.js";

import crypto from "crypto";

import jwt from "jsonwebtoken";

import config from "../config/config.js";

export default async function register(req, res) {
  const { username, email, password } = req.body;

  //check the username and email is unique and does not exist in the db already !

  const isAlreadyRegistered = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isAlreadyRegistered) {
    res.status(409).json({
      message: "username or email is Alreqady registered",
    });
  }

  // so if user does not exist than , create a user:
  // password hashing :

  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  const accessToken = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "15m",
    },
  );
  const refreshToken = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "15d",
    },
  );
  res.cookie("refreshToken",refreshToken,{
    httpOnly:true,
    secure:true,
    sameSite:"strict",
    maxAge: 15 * 24 * 60 * 60 * 1000
  })

  res.status(201).json({
    message: "UseRegistered Successfully",
    user: {
      username: user.username,
      email: user.email,
    },
    accessToken,
    // refreshToken   we dont send refresh token
  });
}
