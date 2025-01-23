import express from "express";
import verifyToken from "../middlewares/verify";

const router = express.Router();

router.get("/home", verifyToken, home);

export default router;
