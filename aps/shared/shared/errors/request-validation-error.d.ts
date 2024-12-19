import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";
export declare class RequestValidationError extends CustomError {
    errors: ValidationError[];
    statusCode: number;
    constructor(errors: ValidationError[]);
    serializeErrors(): {
        errors: {
            messageCode: any;
            field: any;
        }[];
        statusCode: number;
    };
}
//# sourceMappingURL=request-validation-error.d.ts.map