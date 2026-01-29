import crypto from "crypto";

export type Tweet = {
  id: string;
  text: string;
  author: string;
};

const tweets: Tweet[] = [
  { id: "1", text: "Hallo Welt!", author: "alice" },
  { id: "2", text: "Ich liebe TypeScript 😄", author: "bob" },
];

export const tweetService = {
  getAll(): Tweet[] {
    return tweets;
  },

  getById(id: string): Tweet | undefined {
    return tweets.find((t) => t.id === id);
  },

  create(text: string, author: string): Tweet {
    const newTweet: Tweet = {
      id: crypto.randomUUID(),
      text,
      author,
    };

    tweets.push(newTweet);
    return newTweet;
  },

  deleteById(id: string): boolean {
    const index = tweets.findIndex((t) => t.id === id);

    if (index === -1) return false;

    tweets.splice(index, 1);
    return true;
  },
};
