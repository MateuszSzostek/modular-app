import { CustomError } from "./custom-error";
export declare class BadRequestError extends CustomError {
    message: string;
    statusCode: number;
    constructor(message: string);
    serializeErrors(): {
        messageCode: string;
    }[];
}
//# sourceMappingURL=bad-request-error.d.ts.map