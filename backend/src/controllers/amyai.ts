import type { Request, Response } from "express";
import { openai } from "../utils/openai";
export const amyAi = async (req: Request, res: Response) => {
  const { message } = req.body;

  console.log(message);
  const completion = await openai.chat.completions.create({
    model: process.env.OPENROUTER_AI_MODEL as string,
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
  });

  console.log(completion.choices[0].message.content);
};
