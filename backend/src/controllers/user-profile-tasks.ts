/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Ambil data user dan semua task miliknya
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Data user dan list task
 *       401:
 *         description: Unauthorized (token tidak ada/invalid)
 */

import type { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export const userProfileTasks = async (req: Request, res: Response) => {
  const user = (req as any).user;

  if (!user) {
    res.status(401);
    res.json({
      status: res.statusCode,
      message: "Unauthorized",
    });
    return;
  }

  try {
    const userTasks = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        tasks: true,
      },
    });

    res.status(200);
    res.json({
      status: res.statusCode,
      username: userTasks?.username,
      email: userTasks?.email,
      data: userTasks?.tasks,
    });
  } catch (error) {
    console.error("Error fetching user profile", error);
    res.status(403);
    res.json({
      status: res.statusCode,
      message: "Error fetching user profile",
    });
  }
};
