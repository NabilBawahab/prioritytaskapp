import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { userProfileTasks } from "../controllers/user-profile-tasks";
import { createTask } from "../controllers/user-create-task";

export const userRoute = express.Router();

userRoute.get("/", authMiddleware, userProfileTasks);
userRoute.post("/create", authMiddleware, createTask);
