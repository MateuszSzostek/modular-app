"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
const custom_error_1 = require("./custom-error");
class RequestValidationError extends custom_error_1.CustomError {
    constructor(errors) {
        super('Invalid request parameters');
        this.errors = errors;
        this.statusCode = 400;
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serializeErrors() {
        return this.errors.map(err => {
            //@ts-ignore
            return { message: err.msg, field: err.param };
        });
    }
}
exports.RequestValidationError = RequestValidationError;
//# sourceMappingURL=request-validation-error.js.map