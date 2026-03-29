import jwt from "jsonwebtoken";

const JWT_SECRET = "supersecret"; // later move to .env

export const generateToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
};