import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";
import { MESSAGE_KEY, STATUS_CODE } from "../../all/constants";

export class RequestValidationError extends CustomError {
  statusCode = STATUS_CODE._422;

  constructor(public errors: ValidationError[]) {
    super(MESSAGE_KEY.INVALID_REQUEST_PARAMETERS);

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return {
      status: this.statusCode,
      errors: this.errors.map((err) => ({
        messageCode: err.msg,
        //@ts-ignore
        field: err?.path,
      })),
    };
  }
}
