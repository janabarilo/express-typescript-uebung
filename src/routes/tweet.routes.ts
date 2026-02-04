import { Router } from "express";
import {
  getAllTweets,
  getAllTweetsSorted,
  getTweetById,
  createTweet,
  deleteTweet,
  updateTweet,
  getTweetsByAuthor,
} from "../controllers/tweet.controller.js";

const tweetRouter = Router();

tweetRouter.get("/tweets", getAllTweets);
tweetRouter.get("/tweets/sorted", getAllTweetsSorted);
tweetRouter.get("/tweets/:id", getTweetById);
tweetRouter.get("/tweets/author/:author", getTweetsByAuthor);



// ✅ NEW
tweetRouter.post("/tweets", createTweet);
tweetRouter.delete("/tweets/:id", deleteTweet);
tweetRouter.patch("/tweets/:id", updateTweet); // 👈 hinzufügen


export default tweetRouter;
