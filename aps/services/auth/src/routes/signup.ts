import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import {
  validateRequest,
  BadRequestError,
  Subjects,
  AuthSignedUpMessage,
} from "../shared/services";
import { MESSAGE_KEY, FIELD_KEY } from "../shared/all";
import { producer } from "../producer";

import { Auth } from "../models/auth";

const router = express.Router();

router.post(
  "/api/auth/sign-up",
  [
    body(FIELD_KEY.EMAIL)
      .isEmail()
      .withMessage(MESSAGE_KEY.EMAIL_MUST_BE_VALID),
    body(FIELD_KEY.PASSWORD)
      .trim()
      .notEmpty()
      .withMessage(MESSAGE_KEY.PASSWORD_MUST_NOT_BE_EMPTY)
      .isLength({ min: 7 })
      .withMessage(MESSAGE_KEY.PASSWORD_MUST_BE_AT_LEAST_7_CHARACTERS_LONG)
      .matches(/[A-Z]/)
      .withMessage(
        MESSAGE_KEY.PASSWORD_MUST_CONTAIN_AT_LEAST_ONE_UPPERCASE_LETTER
      )
      .matches(/\d/)
      .withMessage(MESSAGE_KEY.PASSWORD_MUST_CONTAIN_AT_LEAST_ONE_NUMBER)
      .matches(/[@$!%*?&]/)
      .withMessage(
        MESSAGE_KEY.PASSWORD_MUST_CONTAIN_AT_LEAST_ONE_SPECIAL_CHARACTER
      ),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await Auth.findOne({ email });

    if (existingUser) {
      throw new BadRequestError(MESSAGE_KEY.EMAIL_IN_USE, FIELD_KEY.EMAIL);
    }

    const user = Auth.build({ email, password });
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

    try {
      const message: AuthSignedUpMessage = {
        userId: user?.id,
        email: user?.email,
      };

      await producer.send({
        topic: Subjects.AuthSignedUp,
        messages: [{ value: JSON.stringify(message) }],
      });
    } catch (error) {
      console.error("Error publishing message:", error);
    }

    res.status(201).send(user);
  }
);

export { router as signupRouter };
