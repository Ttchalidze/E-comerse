import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utilities/jwt";

export function requireUser(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("bearer")) {
    return res.status(401).json({ error: "unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const user = verifyToken(token);
    (req as any).user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "invalid token" });
  }
}
