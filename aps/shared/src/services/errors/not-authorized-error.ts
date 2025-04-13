import { MESSAGE_KEY, STATUS_CODE } from "../../all/constants";
import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
  statusCode = STATUS_CODE._401;

  constructor() {
    super(MESSAGE_KEY.NOT_AUTHORIZED);

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return {
      status: this.statusCode,
      errors: [{ messageCode: MESSAGE_KEY.NOT_AUTHORIZED }],
    };
  }
}
