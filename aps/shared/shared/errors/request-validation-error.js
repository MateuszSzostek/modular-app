"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
const custom_error_1 = require("./custom-error");
class RequestValidationError extends custom_error_1.CustomError {
    constructor(errors) {
        super("Invalid request parameters");
        this.errors = errors;
        this.statusCode = 400;
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serializeErrors() {
        const validationErrors = this.errors.map((err) => ({
            messageCode: err.msg,
            //@ts-ignore
            field: err === null || err === void 0 ? void 0 : err.param,
        }));
        this.errors.forEach((err) => {
            console.log(err);
        });
        return { errors: validationErrors, statusCode: this.statusCode };
    }
}
exports.RequestValidationError = RequestValidationError;
//# sourceMappingURL=request-validation-error.js.map