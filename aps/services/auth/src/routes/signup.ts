import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, BadRequestError } from "../shared";

import { User } from "../models/user";

const router = express.Router();

router.post(
  "/api/auth/sign-up",
  [
    body("email").isEmail().withMessage("email-must-be-valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("password-must-not-be-empty")
      .isLength({ min: 7 })
      .withMessage("password-must-be-at-least-7-characters-long")
      .matches(/[A-Z]/)
      .withMessage("password-must-contain-at-least-one-uppercase-letter")
      .matches(/\d/)
      .withMessage("password-must-contain-at-least-one-number")
      .matches(/[@$!%*?&]/)
      .withMessage("password-must-contain-at-least-one-special-character"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ email, password });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
