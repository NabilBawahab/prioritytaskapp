import express from "express";
import { registerAction } from "../controllers/register";
import { loginAction } from "../controllers/login";

export const authenticationRoute = express.Router();

authenticationRoute.post("/register", registerAction);
authenticationRoute.post("/login", loginAction);
