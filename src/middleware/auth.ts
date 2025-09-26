import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET =process.env.JWT_SECRET as string;

export interface AuthRequest extends Request {
  userId?: string;
}

export default function authMiddleware(req:AuthRequest, res:Response, next:NextFunction) {
  const auth = req.headers["authorization"];
  if (!auth) return res.status(401).json({ message: "No authorization header" });
  const parts = (auth as string).split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") return res.status(401).json({ message: "Invalid authorization format" });

  const token = parts[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    req.userId = payload.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}