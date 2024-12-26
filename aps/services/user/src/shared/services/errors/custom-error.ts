export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name; // Optional: Set custom error name for better logging
    Object.setPrototypeOf(this, CustomError.prototype); // Maintain prototype chain
  }

  // Abstract method to ensure consistent error response structure
  abstract serializeErrors(): { messageCode: string; field?: string }[];
}
