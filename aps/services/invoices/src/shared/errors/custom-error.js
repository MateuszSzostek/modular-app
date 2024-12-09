"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name; // Optional: Set custom error name for better logging
        Object.setPrototypeOf(this, CustomError.prototype); // Maintain prototype chain
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=custom-error.js.map