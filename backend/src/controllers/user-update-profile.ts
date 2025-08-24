import type { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export const updateProfile = async (req: Request, res: Response) => {
  const user = (req as any).user;

  if (!user) {
    res.status(401);
    res.json({
      status: res.statusCode,
      message: "Unauthorized",
    });
    return;
  }

  const { name, bio } = req.body;

  // if (name === user.name && bio === user.bio) {
  //   //Notcompleted
  // }

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: { name, bio },
    });

    res.status(200);
    res.json({
      status: res.statusCode,
      message: "Data successfully updated",
    });
  } catch (error) {
    console.error("Error updating user data", error);
    res.status(500);
    res.json({
      status: res.statusCode,
      message: "Error updating user data",
    });
  }
};
