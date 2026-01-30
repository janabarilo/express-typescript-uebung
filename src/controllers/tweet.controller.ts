import { Request, Response } from "express";
import { tweetService } from "../services/tweet.service.js";

export const getAllTweets = (req: Request, res: Response) => {
  const tweets = tweetService.getAll();
  return res.status(200).json(tweets);
};

export const getTweetById = (req: Request, res: Response) => {
  const id = req.params.id;

  const tweet = tweetService.getById(id);

  if (!tweet) {
    return res.status(404).json({ error: "Tweet not found" });
  }

  return res.status(200).json(tweet);
};

// ✅ NEW: Create
export const createTweet = (req: Request, res: Response) => {
  const { text } = req.body;

 if (!text || typeof text !== "string" || text.trim() === "") {
  return res.status(400).json({ error: "Text is required" });
}


  // author kommt später aus Login (checkAuth)
  const author = "alice";

  const newTweet = tweetService.create(text, author);
  return res.status(201).json(newTweet);
};

// ✅ NEW: Delete
export const deleteTweet = (req: Request, res: Response) => {
  const id = req.params.id;

  const deleted = tweetService.deleteById(id);

  if (!deleted) {
    return res.status(404).json({ error: "Tweet not found" });
  }

  return res.status(200).json({ success: true });
};
