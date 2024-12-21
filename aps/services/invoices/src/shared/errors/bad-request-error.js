"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const constants_1 = require("../constants");
const custom_error_1 = require("./custom-error");
class BadRequestError extends custom_error_1.CustomError {
    constructor(message) {
        super(message);
        this.message = message;
        this.statusCode = constants_1.STATUS_CODE._400;
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    serializeErrors() {
        return [{ messageCode: this.message }];
    }
}
exports.BadRequestError = BadRequestError;
//# sourceMappingURL=bad-request-error.js.map