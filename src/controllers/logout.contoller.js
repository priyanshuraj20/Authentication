import sessionModel from "../models/session.model.js";

import crypto from "crypto";

import jwt from "jsonwebtoken";

export default async function logout(req, res) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    res.status(400).json({
      message: "Refresh token not found",
    });
  }
  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  const session = await sessionModel.findOne({
    refreshTokenHash,
    revoked: false,
  });
  if (!session) {
    return res.status(400).json({
      message: "Invalid refresh token",
    });
  }

  session.revoked = true;
  await session.save();

  //clear cookie:

  res.clear("refreshToken");

  res.status(200).json({
    message: "Logged out successfully",
  });
}
