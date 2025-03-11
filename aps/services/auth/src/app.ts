import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from "./shared/services";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { connectProducer } from "./producer";

const cors = require("cors");

const app = express();

const corsOptions = {
  origin: [
    "http://client.localhost:81",
    "http://client.localhost",
    "http://client:5173",
    "http://0.0.0.0:5173",
  ],
  //enable on prod
  cors: false,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies to be sent
};

app.use(cors(corsOptions));

app.set("trust proxy", true);

app.use(json());

(async () => {
  await connectProducer();
})();

app.use(
  cookieSession({
    signed: false,
    secure: false,
    httpOnly: true,
    sameSite: "none",
  })
);

app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
