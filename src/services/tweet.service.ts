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
};
