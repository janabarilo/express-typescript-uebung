import { Router } from "express";
import {
  getAllTweets,
  getTweetById,
  createTweet,
  deleteTweet,
} from "../controllers/tweet.controller.js";

const tweetRouter = Router();

tweetRouter.get("/tweets", getAllTweets);
tweetRouter.get("/tweets/:id", getTweetById);

// ✅ NEW
tweetRouter.post("/tweets", createTweet);
tweetRouter.delete("/tweets/:id", deleteTweet);

export default tweetRouter;
