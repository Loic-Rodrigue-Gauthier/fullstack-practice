import type { User } from "../models/user.js";
import type { CurrentUser } from "@app/shared";
import { pool } from "../config/database.js";

export async function signupService(email: string, hash: string): Promise<number> {
  const result = await pool.query(
    `
    INSERT INTO users (email, password_hash)
         VALUES ($1, $2)
      RETURNING id
    `,
    [email, hash]
  );

  return result.rows[0].id;
}

export async function signinService(email: string): Promise<User | undefined> {
  const result = await pool.query(
    `
    SELECT *
      FROM users
     WHERE email = $1
    `,
    [email]
  );

  return result.rows[0];
}

export async function meService(userId: number): Promise<CurrentUser> {
  const result = await pool.query(
    `
    SELECT id, email
      FROM users
     WHERE id = $1
    `,
    [userId]
  );

  return result.rows[0];
}
