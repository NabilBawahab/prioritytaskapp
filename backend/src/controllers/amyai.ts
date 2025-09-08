import type { Request, Response } from "express";
export const amyAi = (req: Request, res: Response) => {
  const { message } = req.body;

  console.log(message);
};
