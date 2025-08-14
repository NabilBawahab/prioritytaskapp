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
      id: userTasks?.id,
      name: userTasks?.name,
      email: userTasks?.email,
      avatarUrl: userTasks?.avatarUrl,
      bio: userTasks?.bio,
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
