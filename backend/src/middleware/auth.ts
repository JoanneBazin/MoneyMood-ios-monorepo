import { Request, Response, NextFunction } from "express";
import { clearSessionCookie, HttpError, validateSession } from "../lib";

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("=== REQUIRE AUTH DEBUG ===");
  console.log("Headers:", JSON.stringify(req.headers, null, 2));
  console.log("Cookies bruts:", req.headers.cookie);
  console.log("Cookies parsés:", req.cookies);
  console.log("req.cookies.session:", req.cookies.session);

  const sessionId = req.cookies.session;

  if (!sessionId) {
    console.log(`Erreur: pas de req.cookies.session trouvé --> reset`);
    clearSessionCookie(res);
    return next(new HttpError(401, "Session invalide"));
  }

  console.log("✅ Session ID trouvé:", sessionId);

  const result = await validateSession(sessionId);

  if (!result) {
    console.log(`Erreur: session non trouvée ou expirée`);
    clearSessionCookie(res);
    return next(new HttpError(401, "Session invalide"));
  }

  console.log("✅ Session validée pour user:", result.user.id);

  req.user = result.user;
  req.session = result.session;
  next();
}
