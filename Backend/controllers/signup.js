import bcrypt from "bcrypt";
import User from "../models/user.js";

const signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.send("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.send(newUser);
  } catch (err) {
    res.status(400).json({ error: "Something went wrong" });
    console.log(err);
  }
};

export default signup;
