import jwt from "jsonwebtoken";
const SECRET = process.env.JWT_SECRET || "dev-secret";

export function createToken(payload: object): string {
  return jwt.sign(payload, SECRET, { expiresIn: "1d" });
}

export function verifyToken(token: string): any {
  return jwt.verify(token, SECRET);
}
