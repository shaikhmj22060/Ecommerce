import jwt from "jsonwebtoken";

/**
 * @param {token} -> JWT token encoded
 * @function verifyToken -> Checks the Token valid or not
 * @returns decode if valid, if not return error response
 */
export const verifyToken = (token) => {
  try {
    const decode = jwt.verify(token, process.env.JWT_sECRET);
    return decode;
  } catch (error) {
    return res.status(400).json({ msg: "Invalid token" });
  }
};
