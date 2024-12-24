import { STATUS_CODE } from "../../all/constants";
import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  statusCode = STATUS_CODE._400;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ messageCode: this.message }];
  }
}
