import { CustomError } from "./custom-error";
import { STATUS_CODE, MESSAGE_KEY } from "../../all/constants";

export class DatabaseConnectionError extends CustomError {
  statusCode = STATUS_CODE._500;
  reason = MESSAGE_KEY.CONNECTING_TO_DATABASE_FAILED;

  constructor() {
    super(MESSAGE_KEY.CONNECTING_TO_DATABASE_FAILED);

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ messageCode: this.reason }];
  }
}
