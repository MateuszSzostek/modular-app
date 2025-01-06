import express, { Request, Response } from "express";
import {
  currentUser,
  NotAuthorizedError,
  requireAuth,
  validateRequest,
} from "../shared/services";
import { FIELD_KEY } from "../shared/all";
import { body } from "express-validator";
import ProfileProcessor from "../processors/profileProcessor";

const router = express.Router();

const pf = new ProfileProcessor();

router.post(
  "/api/profile/add-profile",
  currentUser,
  requireAuth,
  [body(FIELD_KEY.NAME).trim().notEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name } = req.body;

    console.log(req?.currentUser);

    if (!req?.currentUser?.id) {
      throw new NotAuthorizedError();
    }

    const newProfile = await pf.addProfile({
      name,
      ownerId: req?.currentUser?.id,
    });

    res.status(201).send(newProfile);
  }
);

export { router as addProfileRouter };
