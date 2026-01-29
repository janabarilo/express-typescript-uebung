import { Request, Response } from "express";
import { userService } from "../services/user.service.js";

export const getAllUsers = (req: Request, res: Response) => {
  const users = userService.getAll();
  return res.status(200).json(users);
};

export const getUserByUsername = (req: Request, res: Response) => {
  const username = req.params.username;

  const user = userService.getByUsername(username);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(200).json(user);
};
