// import jwt from "jsonwebtoken";
// import User from "../models/user.js";

// const SECRET_KEY =
//   "ec09bb5a857fb5c37bbeb4200c8bbdd50c3e5ff23e31e51a45b57942769b";

// const getUser = async (req, res) => {
//   const token = req.cookies.jwt;

//   if (!token) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   try {
//     const decoded = jwt.verify(token, SECRET_KEY);
//     const user = await User.findById(decoded.id);

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.status(200).json({ username: user.username });
//   } catch (error) {
//     res.status(403).json({ error: "Invalid or expired token" });
//   }
// };

// export default getUser;
