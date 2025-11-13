import { Request, Response, NextFunction } from "express";
import { clearSessionCookie, HttpError, validateSession } from "../lib";

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const sessionId = req.cookies.session;

  if (!sessionId) {
    clearSessionCookie(res);
    return next(new HttpError(401, "Session invalide"));
  }

  const result = await validateSession(sessionId);

  if (!result) {
    clearSessionCookie(res);
    return next(new HttpError(401, "Session invalide"));
  }

  req.user = result.user;
  req.session = result.session;
  next();
}
