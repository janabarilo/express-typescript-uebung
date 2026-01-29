import { Router } from "express";
import { getAllUsers, getUserByUsername } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/users", getAllUsers);
userRouter.get("/users/:username", getUserByUsername);

export default userRouter;
