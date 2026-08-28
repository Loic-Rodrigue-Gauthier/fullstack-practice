import { pool } from "../config/database.js";

pool.on("connect", () => {
  console.log("Connected to PostgreSQL");
});

pool.on("error", (err) => {
  console.error("Database error:", err);
});
