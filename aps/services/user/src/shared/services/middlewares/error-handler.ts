import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler: ErrorRequestHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).send({ errors: err.serializeErrors() });
    return;
  }

  console.error(err);
  res.status(500).send({
    errors: [{ message: "Something went wrong" }],
  });
};