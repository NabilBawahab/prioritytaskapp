import express from "express";

import { authMiddleware } from "../middleware/auth-middleware";
import { amyAi } from "../controllers/amyai";

export const aiRoute = express.Router();

aiRoute.post("/amyai", authMiddleware, amyAi);
