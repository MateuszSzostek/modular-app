import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";
import { MESSAGE_KEY, STATUS_CODE } from "../../all/constants";

export class RequestValidationError extends CustomError {
  statusCode = STATUS_CODE._400;

  constructor(public errors: ValidationError[]) {
    super(MESSAGE_KEY.INVALID_REQUEST_PARAMETERS);

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => ({
      messageCode: err.msg,
      //@ts-ignore
      field: err?.param,
    }));
  }
}
