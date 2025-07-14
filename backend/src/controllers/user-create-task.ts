import type { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export const createTask = async (req: Request, res: Response) => {
  const user = (req as any).user;

  if (!user) {
    res.status(401);
    res.json({
      status: res.statusCode,
      message: "Unauthorized",
    });
    return;
  }

  const tasks = req.body ?? [];

  if (tasks.length === 0 || !Array.isArray(tasks)) {
    res.status(400);
    res.json({
      status: res.statusCode,
      message: "No tasks provided",
    });
    return;
  }

  try {
    await prisma.task.createMany({
      data: tasks.map((task) => ({
        ...task,
        userId: user.id,
      })),
    });

    res.status(200);
    res.json({
      status: res.statusCode,
      message: "Tasks created successfully",
    });
    return;
  } catch (error) {
    console.error("Error creating tasks:", error);
    res.status(500);
    res.json({
      status: res.statusCode,
      message: "There was an error creating tasks",
    });
    return;
  }
};
