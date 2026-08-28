import { Router } from "express";
import auth from "../middleware/authMiddleware.js";
import authRoutes from "./authRoutes.js";
import profileRoutes from "./profileRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/profile", auth, profileRoutes); // auth : validates that a user is signed in

export default router;
