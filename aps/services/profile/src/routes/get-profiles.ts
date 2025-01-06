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
  "/api/profile/get-profiles",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    if (!req?.currentUser?.id) {
      throw new NotAuthorizedError();
    }

    const profiles = pf.getProfiles(req?.currentUser?.id);

    res.status(200).send(profiles);
  }
);

export { router as getProfilesRouter };
