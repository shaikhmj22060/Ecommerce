import jwt from "jsonwebtoken";

/**
 * @param {object} payload: any data you want to send or save in the Token
 * @param {String} expiresIn: Token expiry time {default:1h}
 * @returns {String} JWT Token
 */

export const generateToken = (payload) => {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
