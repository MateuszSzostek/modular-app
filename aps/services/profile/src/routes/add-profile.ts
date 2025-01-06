import express, { Request, Response } from "express";
import { currentUser, requireAuth, validateRequest } from "../shared/services";
import { FIELD_KEY } from "../shared/all";
import { body } from "express-validator";
import { Profile } from "../models/profile";

const router = express.Router();

router.post(
  "/api/profile/add-profile",
  currentUser,
  requireAuth,
  [body(FIELD_KEY.NAME).trim().notEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name } = req.body;

    console.log(req?.currentUser);

    //const profile = Profile.build({ name, ownerId: req?.currentUser });
    // await profile.save();

    //  res.status(201).send(profile);
    res.status(201).send({});
  }
);

export { router as addProfileRouter };

/*

import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@cygnetops/common';
import { Ticket } from '../models/ticket';profile
  '/api/tickets',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });
    await ticket.save();
    new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });

    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
*/
