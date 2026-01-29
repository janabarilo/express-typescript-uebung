import { Request, Response } from "express";
import { tweetService } from "../services/tweet.service.js";

export const tweetController = {
  getAll(req: Request, res: Response) {
    const tweets = tweetService.getAll();
    return res.status(200).json(tweets);
  },

  getById(req: Request, res: Response) {
    const id = req.params.id;

    const tweet = tweetService.getById(id);

    if (!tweet) {
      return res.status(404).json({ error: "Tweet not found" });
    }

    return res.status(200).json(tweet);
  },
};
