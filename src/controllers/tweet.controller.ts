import { Request, Response, NextFunction } from "express";
import { tweetService } from "../services/tweet.service.js";



export const getAllTweets = (req: Request, res: Response, next: NextFunction) => {
  try {
  const tweets = tweetService.getAll();
  return res.status(200).json(tweets);
  } catch (err) {
    next(err);
  }
};

export const getTweetById = (req: Request, res: Response, next: NextFunction) => {
  try {
  const id = req.params.id;

  const tweet = tweetService.getById(id);

  if (!tweet) {
    return res.status(404).json({ error: "Tweet not found" });
  }

  return res.status(200).json(tweet);
  } catch (err) {
    next(err);
  } 
};

// ✅ NEW: Create
export const createTweet = (req: Request, res: Response, next: NextFunction) => {
  try {
  const { text } = req.body;

 if (!text || typeof text !== "string" || text.trim() === "") {
  return res.status(400).json({ error: "Text is required" });
}


  // author kommt später aus Login (checkAuth)
  const author = "alice";

  const newTweet = tweetService.create(text, author);
  return res.status(201).json(newTweet);
  } catch (err) {
    next(err);
  }
};

// ✅ NEW: Delete
export const deleteTweet = (req: Request, res: Response, next: NextFunction) => {
  try {
  const id = req.params.id;

  const deleted = tweetService.deleteById(id);

  if (!deleted) {
    return res.status(404).json({ error: "Tweet not found" });
  }

  return res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  } 
};
