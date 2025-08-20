import type { NextFunction, Request, Response } from "express";
import { google } from "../utils/arctic";
import type { GoogleUserData } from "../type/type";

export const googleAuthCallback = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { state, code } = req.query;
  //   console.log({ state, code });

  const codeVerifier = req.cookies.codeVerifier;

  if (!codeVerifier) {
    res.status(400);
    res.json({
      status: res.statusCode,
      message: "Missing codeVerifier",
    });
    return;
  }

  try {
    const tokens = await google.validateAuthorizationCode(
      code as string,
      codeVerifier,
    );

    if (!tokens) {
      res.status(401);
      res.json({
        status: res.statusCode,
        message: "Failed to validate authorization code",
      });
    }

    const accessToken = tokens.accessToken();

    const response = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch user info: ${response.statusText}`);
    }

    const data: GoogleUserData = await response.json();

    (req as any).user = data;

    res.clearCookie("codeVerifier");

    next();
  } catch (error) {
    console.error("Error Google Oauth", error);
    res.status(401);
    res.json({
      status: res.statusCode,
      message: "There is a problem on google authentication",
    });
    return;
  }
};
