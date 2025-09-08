import express from "express";
import { amyAi } from "../controllers/amyai";

export const aiRoute = express.Router();

aiRoute.post("/amyai", amyAi);
