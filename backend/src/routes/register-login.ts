import express from "express";
import { registerAction } from "../controllers/register";
import { loginAction } from "../controllers/login";
import { authMiddleware } from "../middleware/auth-middleware";
import { userProfileTasks } from "../controllers/user-profile-tasks";

export const authenticationRoute = express.Router();

authenticationRoute.post("/register", registerAction);
authenticationRoute.post("/login", loginAction);
authenticationRoute.get("/profile", authMiddleware, userProfileTasks);
