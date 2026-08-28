import rateLimit from "express-rate-limit";

export const ipLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 25,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many signin attempts",
  },
}); // returns this format: (req, res, next) => {}

export const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  keyGenerator: (req) => req.body.email,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many signin attempts",
  },
});
