import pool from "../db/pool.postgres.js";

export type DbTweet = {
  id: number;
  text: string;
  author: string;
};

export async function createTweet(text: string, author: string): Promise<DbTweet> {
  const result = await pool.query(
    `INSERT INTO tweets (text, author)
     VALUES ($1, $2)
     RETURNING id, text, author`,
    [text, author]
  );

  return result.rows[0];
}

export async function getAllTweets(): Promise<DbTweet[]> {
  const result = await pool.query(
    `SELECT id, text, author FROM tweets ORDER BY id DESC`
  );

  return result.rows;
}

export async function getTweetById(id: number): Promise<DbTweet | null> {
  const result = await pool.query(
    `SELECT id, text, author FROM tweets WHERE id = $1`,
    [id]
  );

  return result.rows[0] ?? null;
}

export async function deleteTweetById(id: number): Promise<boolean> {
  const result = await pool.query(
    `DELETE FROM tweets WHERE id = $1`,
    [id]
  );

  return result.rowCount === 1;
}

export async function updateTweetById(
  id: number,
  text: string
) {
  const result = await pool.query(
    `UPDATE tweets
     SET text = $1
     WHERE id = $2
     RETURNING id, text, author`,
    [text, id]
  );

  return result.rows[0]; // entweder Tweet oder undefined
}