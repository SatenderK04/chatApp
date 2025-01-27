import express from "express";
import login from "../controllers/login.js";
import signup from "../controllers/signup.js";
// import getUser from "../controllers/getUser.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
// router.get("/user", getUser);
// router.get("/protected", verifyToken, (req, res) => {
//   res.json({ message: "Access granted to protected route!" });
// });

export default router;
