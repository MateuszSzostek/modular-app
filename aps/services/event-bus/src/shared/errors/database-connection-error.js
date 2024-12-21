"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnectionError = void 0;
const custom_error_1 = require("./custom-error");
const constants_1 = require("../constants");
class DatabaseConnectionError extends custom_error_1.CustomError {
    constructor() {
        super(constants_1.MESSAGE_KEY.CONNECTING_TO_DATABASE_FAILED);
        this.statusCode = constants_1.STATUS_CODE._500;
        this.reason = constants_1.MESSAGE_KEY.CONNECTING_TO_DATABASE_FAILED;
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
    serializeErrors() {
        return [{ messageCode: this.reason }];
    }
}
exports.DatabaseConnectionError = DatabaseConnectionError;
//# sourceMappingURL=database-connection-error.js.map