import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from "./shared/services";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

const cors = require("cors");
const { connectProducer } = require("./kafka");

const app = express();

const corsOptions = {
  origin: [
    "http://client.localhost:81", // Change to client.localhost:81 instead of 0.0.0.0:81
    "http://client.localhost", // You might want to include this as well
    "http://client:5173",
    "http://0.0.0.0:5173", // To allow the frontend container to connect
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies to be sent
};

// Use CORS middleware globally
app.use(cors(corsOptions));

// Trust proxy if behind a load balancer
app.set("trust proxy", true);

// JSON parser middleware
app.use(json());

// Initialize Kafka Producer
(async () => {
  await connectProducer();
})();

// Cookie session middleware
app.use(
  cookieSession({
    signed: false,
    secure: false, // Secure cookies in production
    httpOnly: true, // Prevents client-side JavaScript access
    sameSite: "none",
  })
);

// Routes
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// Handle unknown routes
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

// Global error handler
app.use(errorHandler);

export { app };
