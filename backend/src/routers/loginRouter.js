import express from "express";
import { getUserDetials } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddlewre.js";

const router = express.Router();

router.get("/", authMiddleware, getUserDetials);
export default router;
