import { Request, Response, NextFunction } from "express";
import { tweetService } from "../services/tweet.service.js";
import { HttpError } from "../errors/httpError.js";


export const getAllTweets = async(req: Request, res: Response, next: NextFunction) => {
  try {
  const tweets = await tweetService.getAll();
  return res.status(200).json(tweets);
  } catch (err) {
    next(err);
  }
};

export const getTweetById = async (req: Request, res: Response, next: NextFunction) => {
  try {
  const id = req.params.id;

  const tweet = await tweetService.getById(id);
  return res.status(200).json(tweet);
  } catch (err) {
    next(err);
  } 
};


// ✅ NEW: Create
export const createTweet = async(req: Request, res: Response, next: NextFunction) => {
  try {
  const { text } = req.body;

 if (!text || typeof text !== "string" || text.trim() === "") {
  return next(new HttpError(400, "Text is required"));
}


  // author kommt später aus Login (checkAuth)
  const author = "alice";

  const newTweet = await tweetService.create(text, author);
  return res.status(201).json(newTweet);
  } catch (err) {
    next(err);
  }
};

// ✅ NEW: Delete
export const deleteTweet = async (req: Request, res: Response, next: NextFunction) => {
  try {
  const id = req.params.id;

  const deleted = await tweetService.deleteById(id);

  if (!deleted) {
    return next(new HttpError(404, "Tweet not found"));
  }

  return res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  } 
};
  export const updateTweet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const { text } = req.body;

    if (!text || typeof text !== "string" || text.trim() === "") {
      return next(new HttpError(400, "Text is required"));
    }

    const updatedTweet = await tweetService.updateById(id, text);

    return res.status(200).json(updatedTweet);
  } catch (err) {
    next(err);
}
};