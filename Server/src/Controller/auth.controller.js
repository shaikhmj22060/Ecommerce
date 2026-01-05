import { User } from "../Models/User.model.js";
import isEmail from "validator/lib/isEmail.js";
import bcrypt from "bcrypt";
import { generateToken } from "../Config/generateToken.config.js";
import { verifyToken } from "../Config/verifyToken.config.js";
export const Register = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;
    if ((!username, !name, !email, !password)) {
      return res.status(400).json({ msg: "Please fill all the details " });
    }
    const usernameExist = await User.findOne({ username });
    if (usernameExist) {
      return res.status(409).json({ msg: "Username Taken" });
    }
    if (!isEmail(email)) {
      return res.status(400).json({ msg: "invalid email address" });
    }
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(409).json({ msg: "Email already exists" });
    }
    if (password.length < 6 || password.length > 16) {
      return res.status(400).json({
        msg: " Password should be minimum 6 characters and maximum 16 characters",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      name,
      email,
      password: hashedPassword,
    });
    const token = generateToken({ id: user._id });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 100,
    });
    return res.status(200).json({
      msg: "Registerd Succesfully",
      user: {
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.Role,
      },
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const Login = async (req, res) => {
  try {
    const { emailOrusername, password } = req.body;
    const LoggedIn = req.cookies.token;
    if (LoggedIn) {
      const decode = verifyToken(LoggedIn);

      if (decode && decode.id && decode.role == "User") {
        return res.status(400).json({ msg: "Already Logged in" });
      }
    }
    if (!emailOrusername || !password) {
      return res.status(400).json({ msg: "Please fill all the details" });
    }
    let user;
    if (isEmail(emailOrusername)) {
      user = await User.findOne({ email: emailOrusername });
    } else {
      user = await User.findOne({ username: emailOrusername });
    }
    if (!user) {
      return res.status(400).json({ msg: "Invalid email/username" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ msg: "Invalid Email/Usrname or  Password" });
    }
    const token = generateToken({ id: user._id, role: user.Role });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      msg: "Log in successfull",
      user: {
        username: user.username,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
export const Logout = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (token) {
      const decoded = verifyToken(token);
      const id = User.findById(decoded.id);
      if (!id) {
        return res.status(404).json({ msg: "User not found" });
      }
      if (decoded && id) {
        res.clearCookie("token", {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          path: "/",
        });
        return res.status(200).json({
          msg: "Logout Successfull",
        });
      }
    } else {
      return res.status(400).json({ msg: "Login first" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
