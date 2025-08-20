/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user dan dapatkan token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login sukses dan token dikembalikan
 *       401:
 *         description: Credential tidak valid
 */

import type { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { GoogleUserData } from "../type/type";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FRONTEND_URL = process.env.FE_URL;

export const loginAction = async (
  req: Request,
  res: Response,
): Promise<void> => {
  let user;

  // Google oauth
  if ((req as any).user) {
    const googleUser = (req as any).user as GoogleUserData;

    try {
      user = await prisma.user.findUnique({
        where: {
          email: googleUser.email,
        },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            email: googleUser.email,
            name: googleUser.name,
          },
        });
      }
    } catch (error) {
      console.error("Error google oauth action", error);

      res.status(500);
      res.json({
        status: res.statusCode,
        message: "There is an Error in google Oauth",
      });
      return;
    }
  } else {
    // Standard Login
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
      user = await prisma.user.findUnique({
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
        user.password as string,
      );

      if (!isPasswordValid) {
        res.status(401);
        res.json({
          status: res.statusCode,
          message: "Invalid credential",
        });
        return;
      }
    } catch (error) {
      console.error("Error during login", error);
      res.status(500);
      res.json({
        status: res.statusCode,
        message: "There is a problem during login",
      });
      return;
    }
  }

  if (!user) {
    return;
  }

  try {
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: 86400 }, // 24 hours
    );

    if ((req as any).user) {
      res.status(200);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        expires: new Date(Date.now() + 60 * 60 * 24 * 1000), // 1 day
      });

      res.redirect(`${FRONTEND_URL}/auth/callback`);
    } else {
      res.json({
        status: res.statusCode,
        message: "Login successful",
        data: {
          token,
        },
      });
    }
  } catch (error) {
    console.error("Error generating JWT", error);
    res.status(500);
    res.json({
      status: res.statusCode,
      message: "Something wrong during login",
    });
  }
};
