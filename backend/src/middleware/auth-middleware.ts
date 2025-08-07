import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401);
    res.json({
      status: res.statusCode,
      message: "No token provided!",
    });
    return;
  }

  //split jadi array [Bearer, Token] ambil indeks ke 1 (Token)
  const token = authHeader?.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      res.status(404);
      res.json({ status: res.statusCode, message: "User not found!" });
      return;
    }

    (req as any).user = user;

    next();
  } catch (error) {
    console.error("Error authenticating", error);

    res.status(403);
    res.json({
      status: res.statusCode,
      message: "Invalid or expired token",
    });
    return;
  }
};
