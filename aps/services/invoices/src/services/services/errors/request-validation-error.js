"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
const custom_error_1 = require("./custom-error");
const constants_1 = require("../../all/constants");
class RequestValidationError extends custom_error_1.CustomError {
    constructor(errors) {
        super(constants_1.MESSAGE_KEY.INVALID_REQUEST_PARAMETERS);
        this.errors = errors;
        this.statusCode = constants_1.STATUS_CODE._400;
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serializeErrors() {
        return this.errors.map((err) => ({
            messageCode: err.msg,
            //@ts-ignore
            field: err === null || err === void 0 ? void 0 : err.param,
        }));
    }
}
exports.RequestValidationError = RequestValidationError;
//# sourceMappingURL=request-validation-error.js.map