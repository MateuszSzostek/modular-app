"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const constants_1 = require("../constants");
const custom_error_1 = require("./custom-error");
class NotFoundError extends custom_error_1.CustomError {
    constructor() {
        super(constants_1.MESSAGE_KEY.NOT_FOUND);
        this.statusCode = constants_1.STATUS_CODE._404;
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    serializeErrors() {
        return [{ messageCode: constants_1.MESSAGE_KEY.NOT_FOUND }];
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=not-found-error.js.map