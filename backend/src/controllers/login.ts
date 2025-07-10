import type { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const loginAction = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    res.status(406);
    res.json({
      status: res.statusCode,
      message: "Field must be filled",
    });
    return;
  }

  if (!emailRegex.test(email)) {
    res.status(400);
    res.json({
      status: res.statusCode,
      message: "Invalid email format",
    });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(404);
      res.json({
        status: res.statusCode,
        message: "User not found, please register first",
      });
      return;
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      res.status(401);
      res.json({
        status: res.statusCode,
        message: "Invalid credential",
      });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" },
    );

    res.status(200);
    res.json({
      status: res.statusCode,
      message: "Login successful",
      data: {
        token,
      },
    });
  } catch (error) {}
};
