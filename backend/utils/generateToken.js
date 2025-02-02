import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.ACCCES_TOKEN_SECRET, {
    expiresIn: process.env.ACCCES_TOKEN_EXPIRY || "15d",
  });

  res.cookie("netflix-token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, // prevents XSS attacks, cross-site scripting attacks, make it not be accessible by javascript
    secure: process.env.NODE_ENV !== "dev", // only works on https
    sameSite: "strict", // prevents CSRF attacks, cross-site request forgery attacks
  });

  return token;
};
