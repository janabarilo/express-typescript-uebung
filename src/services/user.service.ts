import users from "../../data/users.json";

export type UserPublic = {
  username: string;
};

export const userService = {
  getAll(): UserPublic[] {
    return users.map((u) => ({ username: u.username }));
  },

  getByUsername(username: string): UserPublic | undefined {
    const user = users.find((u) => u.username === username);
    if (!user) return undefined;

    return { username: user.username };
  },
};
