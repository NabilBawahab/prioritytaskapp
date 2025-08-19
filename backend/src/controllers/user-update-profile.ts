import type { Request, Response } from "express";

export const updateProfile = (req: Request, res: Response) => {
  const user = (req as any).user;

  if (!user) {
    res.status(401);
    res.json({
      status: res.statusCode,
      message: "Unauthorized",
    });
    return;
  }

  const { email, name, bio } = req.body;

  if (!email || !name || !bio) {
    //Notcompleted
  }
};
