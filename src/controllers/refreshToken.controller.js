// these end point is for creating a new access token with a refesh token
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export default async function refreshToken(req, res) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "No refresh token ",
    });
  }
  //if refresh token found than verify it and , so genrate new access token:
  const decoded = JsonWebTokenError.verify(refreshToken, config.JWT_SECRET);


  //for extra layer of security we genrate new refresh token also :


  //isse yeh hota ki galti se refresh token attacker ke pas aa bhi gaya toh refresh token sirf 15 min ke liye hoi rahega , fir new access token genrate hone ke samay new refresh token genrate hojayega ,. also , we have inauncthenticate old refresh token
  const newRefreshToken = jwt.sign({
    id:decoded.id
  },config.JWT_SECRET,{
    expiresIn:"&d"
  })
res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});
  const accessToken = jwt.sign(
    {
      id: decoded.id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "15m",
    },
  );

  res.status(200).json({
    message: "Access token refreshed successfully",
    accessToken,
  });
}
