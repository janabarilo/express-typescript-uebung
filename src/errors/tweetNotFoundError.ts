export class TweetNotFoundError extends Error {
  constructor() {
    super("Tweet not found");
    this.name = "TweetNotFoundError";
  }
}
