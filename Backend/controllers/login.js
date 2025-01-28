import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "ec09bb5a857fb5c37bbeb4200c8bbdd50c3e5ff23e31e51a45b57942769b";

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials!" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    // Send token and username in the response
    res.status(200).json({ token, username });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export default login;
