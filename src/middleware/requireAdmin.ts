import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utilities/jwt";

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const user = verifyToken(token);
    if (user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden: Admins only" });
    }
    (req as any).user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}
