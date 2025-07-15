import type { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export const updateTask = async (req: Request, res: Response) => {
  const user = (req as any).user;

  if (!user) {
    res.status(401);
    res.json({
      status: res.statusCode,
      message: "Unauthorized",
    });
    return;
  }

  const { id, status } = req.body ?? {};

  if (!id) {
    res.status(406);
    res.json({
      status: res.statusCode,
      message: "Task ID must be provided",
    });
    return;
  }

  if (!status) {
    res.status(406);
    res.json({
      status: res.statusCode,
      message: "Field must be filled",
    });
    return;
  }

  if (status !== "TODO" && status !== "IN_PROGRESS" && status !== "DONE") {
    res.status(400);
    res.json({
      status: res.statusCode,
      message: "Invalid status value. Must be TODO, IN_PROGRESS, or DONE.",
    });
    return;
  }

  try {
    await prisma.task.update({
      where: { id, userId: user.id },
      data: {
        status,
      },
    });
    res.status(200);
    res.json({
      status: res.statusCode,
      message: "Task updated successfully",
    });
    return;
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500);
    res.json({
      status: res.statusCode,
      message: "Internal server error",
    });
    return;
  }
};
