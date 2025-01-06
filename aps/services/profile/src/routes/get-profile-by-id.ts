import express, { Request, Response } from "express";
import {
  currentUser,
  NotAuthorizedError,
  requireAuth,
} from "../shared/services";
import ProfileProcessor from "../processors/profileProcessor";

const router = express.Router();

const pf = new ProfileProcessor();

router.get(
  "/api/profile/get-profile-by-id/:id",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!req?.currentUser?.id) {
      throw new NotAuthorizedError();
    }

    const profile = pf.getProfileById(id);

    res.status(200).send(profile);
  }
);

export { router as getProfileByIdRouter };
