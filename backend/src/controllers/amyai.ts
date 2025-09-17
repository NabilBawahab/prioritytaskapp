import type { Request, Response } from "express";
import { openai } from "../utils/openai";
import type { ChatCompletionMessageParam } from "openai/resources/index";
import { prisma } from "../utils/prisma";
import { Task } from "@prisma/client";

const getUserTasks = () => {};

export const amyAi = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const userId = user.id;
  const chatRequests: ChatCompletionMessageParam[] = req.body;

  const keyWords = ["task", "todo", "to do"];

  const lastMessage = chatRequests[chatRequests.length - 1];

  const checkKeyWords = keyWords.some((keyWord) => {
    const check =
      typeof lastMessage.content === "string" &&
      lastMessage.content?.toLowerCase().includes(keyWord);
    return check;
  });

  if (lastMessage.role === "user" && checkKeyWords) {
    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
      take: 3,
    });
    if (tasks.length > 0) {
      const stringTasks = tasks
        .map(
          (task, index) =>
            `${index + 1}. ${task.title}\nTask Description: ${
              task.description
            }\ndue date: ${task.dueDate.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}\npriority: ${task.priority}\nStatus: ${task.status}`,
        )
        .join("\n");

      chatRequests.push({
        role: "system",
        content: `Here are the last 5 tasks for user, and say to user right now you can only provide 3 last tasks ${user.name}:\n${stringTasks}`,
      });
    } else {
      chatRequests.push({
        role: "system",
        content: `User ${user.name} currently have no tasks`,
      });
    }
  }

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENROUTER_AI_MODEL as string,
      messages: [
        {
          role: "system",
          content: `You are a friendly and helpful AI assistant. 
- Answer clearly and concisely. 
- Be informative but efficient. 
- Always reply in the same language as the user. 
- Match the user’s style and keep a cheerful tone.`,
        },
        ...chatRequests,
      ],
    });

    console.log(completion.choices[0].message.content);
  } catch (error) {
    console.error(error);
  }
};
