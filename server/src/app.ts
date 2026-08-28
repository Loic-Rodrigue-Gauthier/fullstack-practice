import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import routes from "./routes/index.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import { env } from "./config/env.js";

const app = express();

app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

if (env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

export default app;
