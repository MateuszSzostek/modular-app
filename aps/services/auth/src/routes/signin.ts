import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, BadRequestError } from "../shared/services";

import { Password } from "../services/password";
import { Auth } from "../models/auth";

const router = express.Router();

router.post(
  "/api/auth/sign-in",
  [
    body("email").isEmail().withMessage("email-must-be-valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("password-must-not-be-empty"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await Auth.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("invalid-credentials", "password");
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError("invalid-credentials", "password");
    }

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
