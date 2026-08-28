import { Router } from "express";
import { signup, signin, signout, me } from "../controllers/authController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { signupValidation, signinValidation } from "../validators/authValidation.js";
import { ipLimiter, emailLimiter } from "../middleware/signinLimiters.js";
import auth from "../middleware/authMiddleware.js";

const router = Router();

router.post("/signup", signupValidation, validateRequest, signup); // validates data before controller
router.post("/signin", ipLimiter, emailLimiter, signinValidation, validateRequest, signin);
router.post("/signout", auth, signout);
router.get("/me", me); // me : logged in user

export default router;
