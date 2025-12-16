import rateLimit from "express-rate-limit";

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === "production" ? 100 : 10000,
  message: { error: "Trop de requêtes envoyées, réessayez plus tard" },
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === "production" ? 5 : 1000,
  message: { error: "Trop de tentatives de connexion, réessayez plus tard" },
  skipSuccessfulRequests: true,
});
