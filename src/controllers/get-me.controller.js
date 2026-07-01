import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

import config from "../config/config.js";

export default async function getMe(req, res) {
  const token = req.headers.authorization?.split(" ")[1];

  // #user kbhi registered kiya hi nahi toh token rahega hi nahi
  if (!token) {
    return res.status(401).json({
      message: "Token not provided",
    });
  }

  // decode & verify the tokenwith jwt secret key :

  const decoded = jwt.verify(token, config.JWT_SECRET);

  console.log(decoded); //we get : id , iat, exp

  const user = await userModel.findById(decoded.id);

//   if (!user) {
//     return res.status(404).json({
//       message: "User not found!",
//     });
    return res.status(200).json({
      message: "User fetched successfully!",
      user: {
        username: user.username,
        email: user.email,
      },
    });
  }

