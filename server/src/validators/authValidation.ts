import { body } from "express-validator";

export const signupValidation = [
  body("email").trim().toLowerCase().isEmail().withMessage("Invalid email"),
  body("password").isString().bail().isLength({ min: 12 }),
];

export const signinValidation = [
  body("email").trim().toLowerCase().isEmail().withMessage("Invalid email"),
  body("password").notEmpty(),
];
