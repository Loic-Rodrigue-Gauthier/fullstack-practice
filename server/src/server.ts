import app from "./app.js";
import { env } from "./config/env.js";
import { pool } from "./config/database.js";

async function start() {
  try {
    await pool.query("SELECT NOW()");

    console.log("Database connected");

    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });
  } catch (err) {
    console.error("Unable to connect to PostgreSQL", err);

    process.exit(1);
  }
}

start();
