import { Request, Response, NextFunction } from "express";
import { TweetNotFoundError } from "../errors/tweetNotFoundError.js";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // bekannte Fehler (400, 404, ...)
  if (err instanceof TweetNotFoundError) {
    return res.status(404).json({ error: err.message });
  }

  // unerwartete Fehler -> 500
  console.error("ERROR:", err);
  return res.status(500).json({ error: "Internal server error" });
};
