import express from "express";
import { registerAction } from "../controllers/register";
import { loginAction } from "../controllers/login";
import { googleLoginAction } from "../controllers/oauth-login";
import { googleAuthCallback } from "../middleware/google-oauth-callback";

export const authenticationRoute = express.Router();

authenticationRoute.post("/register", registerAction);
authenticationRoute.post("/login", loginAction);
authenticationRoute.get("/continuegoogle", googleLoginAction);
authenticationRoute.get(
  "/auth/google/callback",
  googleAuthCallback,
  loginAction,
);
