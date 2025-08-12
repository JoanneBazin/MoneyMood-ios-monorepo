import { Application } from "express";
import cors from "cors";
import helmet from "helmet";

export const setupSecurity = (app: Application) => {
  app.use(
    cors({
      origin:
        process.env.NODE_ENV === "production" ? true : "http://localhost:5173",
      credentials: true,
    })
  );

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
        },
      },
      hidePoweredBy: true,
      hsts: process.env.NODE_ENV === "production",
    })
  );
};
