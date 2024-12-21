"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAuthorizedError = void 0;
const constants_1 = require("../constants");
const custom_error_1 = require("./custom-error");
class NotAuthorizedError extends custom_error_1.CustomError {
    constructor() {
        super(constants_1.MESSAGE_KEY.NOT_AUTHORIZED);
        this.statusCode = constants_1.STATUS_CODE._401;
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }
    serializeErrors() {
        return [{ messageCode: constants_1.MESSAGE_KEY.NOT_AUTHORIZED }];
    }
}
exports.NotAuthorizedError = NotAuthorizedError;
//# sourceMappingURL=not-authorized-error.js.map