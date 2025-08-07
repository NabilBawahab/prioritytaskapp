import type { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.body ?? {};

  if (!id) {
    res.status(406);
    res.json({
      status: res.statusCode,
      message: "Didn't provide task ID",
    });
    return;
  }

  try {
    await prisma.task.delete({
      where: { id },
    });

    res.status(200);
    res.json({
      status: res.statusCode,
      message: "Task has been deleted",
    });
    return;
  } catch (error) {
    console.error("Error deleting data", error);
    res.status(404);
    res.json({
      status: res.statusCode,
      message: "There is a problem on our end",
    });
    return;
  }
};
