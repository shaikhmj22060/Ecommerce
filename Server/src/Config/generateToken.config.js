import jwt from "jsonwebtoken";

/**
 * @param {object} payload: any data you want to send or save in the Token
 * @param {String} expiresIn: Token expiry time {default:1h}
 * @returns {String} JWT Token
 */

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};
