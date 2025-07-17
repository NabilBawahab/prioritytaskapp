/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register user baru
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - username
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registrasi berhasil
 *       409:
 *         description: Email sudah terdaftar
 */

import type { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import bcrypt from "bcrypt";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const registerAction = async (req: Request, res: Response) => {
  const { email, username, password } = req.body ?? {};

  if (!email || !username || !password) {
    res.status(406);
    res.json({
      status: res.statusCode,
      message: "Please fill all fields",
    });
    return;
  }

  if (password.length < 8) {
    res.status(406);
    res.json({
      status: res.statusCode,
      message: "Password must be at least 8 characters long",
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
    const isUserRegistered = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isUserRegistered) {
      res.status(409);
      res.json({
        status: res.statusCode,
        message: "User already registered",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    res.status(200);
    res.json({
      status: res.statusCode,
      message: "User succesfully registered",
    });
    return;
  } catch (error) {
    console.error("Error registering user", error);
    res.status(404);
    res.json({
      status: res.statusCode,
      message: "There is a problem on our end",
    });
    return;
  }
};
