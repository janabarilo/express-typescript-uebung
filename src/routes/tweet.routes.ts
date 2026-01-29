import { Router } from "express";
import { getAllTweets, getTweetById } from "../controllers/tweet.controller.js";

const tweetRouter = Router();

// Read: alle Tweets
tweetRouter.get("/tweets", getAllTweets);

// Read: Tweet per ID
tweetRouter.get("/tweets/:id", getTweetById);

export default tweetRouter;
