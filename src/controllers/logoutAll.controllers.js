import sessionModel from "../models/session.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export default async function logoutAll(req, res) {
  try {
    // Get refresh token from cookie
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({
        message: "Refresh token not found",
      });
    }

    // Verify refresh token
    // If the token is invalid or expired, jwt.verify() will throw an error.
    const decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET);

    // Revoke every active session of this user
    await sessionModel.updateMany(
      {
        user: decoded.id,
        revoked: false,
      },
      {
        $set: {
          revoked: true,
        },
      },
    );

    // Remove refresh token cookie from browser
    res.clearCookie("refreshToken");

    return res.status(200).json({
      message: "Logged out from all devices successfully",
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired refresh token",
    });
  }
}
