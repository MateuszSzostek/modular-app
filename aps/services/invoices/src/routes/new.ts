import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "../shared/services";
import { Invoice } from "../models/invoice";

const router = express.Router();

router.post(
  "/api/invoice/new",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      ownerId,
      invoiceNumber,
      receiverId,
      receiverName,
      language,
      createdAt,
      updatedAt,
      issuedAt,
      status,
      isPaid,
      currency,
      items,
      totalNetPrice,
      totalVatPrice,
      totalPrice,
      note,
    } = req.body;

    const invoice = Invoice.build({
      ownerId: req.currentUser!.id,
      invoiceNumber,
      receiverId,
      receiverName,
      language,
      createdAt,
      updatedAt,
      issuedAt,
      status,
      isPaid,
      currency,
      items,
      totalNetPrice,
      totalVatPrice,
      totalPrice,
      note,
    });
    await ticket.save();

    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
