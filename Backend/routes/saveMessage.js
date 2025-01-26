import express from "express";
import saveMessage from "../controllers/saveMessage.js";

const router = express.Router();

router.post("/", saveMessage);

export default router;
