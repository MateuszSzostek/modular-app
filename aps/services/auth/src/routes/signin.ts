import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, BadRequestError } from "../shared/services";
import { MESSAGE_KEY, FIELD_KEY } from "../shared/all";
import { Password } from "../services/password";
import { Auth } from "../models/auth";

const router = express.Router();

router.post(
  "/api/auth/sign-in",
  [
    body(FIELD_KEY.EMAIL)
      .isEmail()
      .withMessage(MESSAGE_KEY.EMAIL_MUST_BE_VALID),
    body(FIELD_KEY.PASSWORD)
      .trim()
      .notEmpty()
      .withMessage(MESSAGE_KEY.PASSWORD_MUST_NOT_BE_EMPTY),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await Auth.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError(
        MESSAGE_KEY.INVALID_CREDENTIALS,
        FIELD_KEY.PASSWORD
      );
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError(
        MESSAGE_KEY.INVALID_CREDENTIALS,
        FIELD_KEY.PASSWORD
      );
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
