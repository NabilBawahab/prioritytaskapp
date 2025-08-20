import type { Request, Response } from "express";
import * as arctic from "arctic";
import { google } from "../utils/arctic";

export const googleLoginAction = (req: Request, res: Response) => {
  const state = arctic.generateState();
  const codeVerifier = arctic.generateCodeVerifier();
  const scopes = ["openid", "profile", "email"];

  res.cookie("codeVerifier", codeVerifier, { httpOnly: true });

  const url = google.createAuthorizationURL(state, codeVerifier, scopes);

  res.redirect(url.href);
};
