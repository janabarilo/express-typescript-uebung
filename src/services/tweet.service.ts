import { TweetNotFoundError } from "../errors/tweetNotFoundError.js";
import * as tweetRepo from "../repos/tweet.repo.js";

export const tweetService = {
  async getAll() {
    return tweetRepo.getAllTweets();
  },

  async getById(id: string) {
    const tweet = await tweetRepo.getTweetById(Number(id));
    if (!tweet) throw new TweetNotFoundError();
    return tweet;
  },

  async create(text: string, author: string) {
    return tweetRepo.createTweet(text, author);
  },

  async deleteById(id: string) {
    return tweetRepo.deleteTweetById(Number(id));
  },

  async updateById(id: string, text: string) {
  const updated = await tweetRepo.updateTweetById(Number(id), text);

  if (!updated) throw new TweetNotFoundError();

  return updated;
},

};
