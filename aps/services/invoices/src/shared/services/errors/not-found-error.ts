import { MESSAGE_KEY, STATUS_CODE } from "../../all/constants";
import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode = STATUS_CODE._404;

  constructor() {
    super(MESSAGE_KEY.NOT_FOUND);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ messageCode: MESSAGE_KEY.NOT_FOUND }];
  }
}
