import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super("Invalid request parameters");

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    const validationErrors = this.errors.map((err) => ({
      messageCode: err.msg,
      //@ts-ignore
      field: err?.param,
    }));

    this.errors.forEach((err) => {
      console.log(err);
    });

    return { errors: validationErrors, statusCode: this.statusCode };
  }
}
