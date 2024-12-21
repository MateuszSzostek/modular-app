import { CustomError } from "./custom-error";
export declare class NotFoundError extends CustomError {
    statusCode: number;
    constructor();
    serializeErrors(): {
        messageCode: string;
    }[];
}
//# sourceMappingURL=not-found-error.d.ts.map