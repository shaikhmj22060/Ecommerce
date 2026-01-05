import isEmail from "validator/lib/isEmail.js";
import { User } from "../../Models/User.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../Config/generateToken.config.js";
import { verifyToken } from "../../Config/verifyToken.config.js";

export const adminRegister = async (req, res) => {
  try {
    const { username, name, email, password, secret } = req.body;
    if (!name || !email || !password || !secret || !username) {
      return res.status(400).json({ msg: "Please fill all the details" });
    }
    if (!isEmail(email)) {
      return res.status(400).json({ msg: "Invalid email address" });
    }
    const emailExist = await User.findOne({ email });
    const usernameExist = await User.findOne({ username });
    if (emailExist) {
      return res.status(409).json({ msg: "Email already exists" });
    }
    if (usernameExist) {
      return res.status(409).json({ msg: "Username already exists" });
    }
    if (password.length < 6 || password.length > 16) {
      return res.status(400).json({
        msg: "Password should be minimum 6 characters and maximum 16 characters",
      });
    }
    if (!secret == process.env.admin_secret) {
      return res.status(400).json({ msg: "Enter valid secret" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      name,
      email,
      password: hashedPassword,
      Role: "Admin",
    });
    const token = generateToken({ id: user._id, role: user.Role });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 100,
    });
    return res.status(200).json({
      msg: "Admin created succesfully",
      admin: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.Role,
      },
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const loggedIn = req.cookies.token;
    if (loggedIn) {
      const decode = verifyToken(loggedIn);

      if (decode && decode.id && decode.role == "Admin") {
        return res.status(400).json({ msg: "Already loggedIn" });
      }
    }
    if (!username || !password) {
      return res.status(400).json({ msg: "Please fill all the details" });
    }
    const isAdmin = await User.findOne({ username, Role: "Admin" });
    if (!isAdmin) {
      return res.status(400).json({ msg: "Invalid user" });
    }
    const isMatch = await bcrypt.compare(password, isAdmin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect Password" });
    }
    const token = generateToken({ id: isAdmin._id, role: isAdmin.Role });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      msg: "Login succsess",
      admin: {
        username: isAdmin.username,
        name: isAdmin.name,
        email: isAdmin.email,
        role: isAdmin.Role,
      },
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
