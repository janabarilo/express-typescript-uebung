import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/httpError.js";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // bekannte Fehler (400, 404, ...)
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message });
  }

  // unerwartete Fehler -> 500
  console.error("UNEXPECTED ERROR:", err);
  return res.status(500).json({ error: "Internal server error" });
};
