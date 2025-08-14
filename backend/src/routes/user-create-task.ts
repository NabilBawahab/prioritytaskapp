import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { userProfileTasks } from "../controllers/user-profile-tasks";
import { createTask } from "../controllers/user-create-task";
import { updateTask } from "../controllers/user-update-task";
import { deleteTask } from "../controllers/user-delete-tasks";
import { updateProfile } from "../controllers/user-update-profile";

export const userRoute = express.Router();

userRoute.get("/", authMiddleware, userProfileTasks);
userRoute.post("/create", authMiddleware, createTask);
userRoute.put("/updatetask", authMiddleware, updateTask);
userRoute.delete("/delete", authMiddleware, deleteTask);
userRoute.put("/updateprofile", authMiddleware, updateProfile);
