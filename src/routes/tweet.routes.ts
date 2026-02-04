import { Router } from "express";
import {
  getAllTweets,
  getTweetById,
  createTweet,
  deleteTweet,
  updateTweet,
} from "../controllers/tweet.controller.js";

const tweetRouter = Router();

tweetRouter.get("/tweets", getAllTweets);
tweetRouter.get("/tweets/:id", getTweetById);


// ✅ NEW
tweetRouter.post("/tweets", createTweet);
tweetRouter.delete("/tweets/:id", deleteTweet);
tweetRouter.patch("/tweets/:id", updateTweet); // 👈 hinzufügen


export default tweetRouter;
