import bcrypt from "bcrypt";

const signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.send(newUser);
  } catch (err) {
    res.status(400).json({ error: "Username already exists!" });
  }
};

export default signup;
