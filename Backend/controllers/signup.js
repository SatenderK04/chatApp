import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
dotenv.config();

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "ec09bb5a857fb5c37bbeb4200c8bbdd50c3e5ff23e31e51a45b57942769b";

const signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // Generate JWT
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Send response with the token and username
    res.status(201).json({ token, username: newUser.username });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
    console.log(err);
  }
};

export default signup;
