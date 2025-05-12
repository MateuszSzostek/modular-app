import { ResponseCatchErrorData } from '../types'

export type ErrorMap = Record<string, string[]>

/**
 * Parses error messages from a `ResponseCatchErrorData` object and maps them to a structured `ErrorMap`.
 *
 * @param {ResponseCatchErrorData} errors - The error response object containing error messages.
 * @returns {ErrorMap} - A structured map of error keys and corresponding localized error codes.
 *
 * @example
 * const errors = {
 *   data: {
 *     message: [
 *       "email.invalid",
 *       "password.too_short",
 *     ]
 *   }
 * };
 *
 * const errorMap = getErrors(errors);
 * console.log(errorMap);
 * // Output:
 * // {
 * //   email: ["error-code.email.invalid"],
 * //   password: ["error-code.password.too_short"]
 * // }
 *
 * @typedef {Object} ResponseCatchErrorData
 * @property {Object} data - The data object containing error details.
 * @property {string[]} data.message - An array of error message strings in the format "key.detail".
 *
 * @typedef {Object.<string, string[]>} ErrorMap
 * A record where keys represent error categories (e.g., `email`, `password`) and
 * values are arrays of corresponding localized error codes.
 *
 * @throws {TypeError} If `errors` is undefined, null, or doesn't follow the expected structure.
 */
export function getErrors(errors: ResponseCatchErrorData): ErrorMap {
  return errors?.data?.message?.reduce((acc: ErrorMap, message) => {
    const messageData = message?.split('.')
    if (!messageData || messageData.length < 2) {
      return acc // Skip invalid messages
    }

    const key = messageData[0]
    const errorCode = `error-code.${key}.${messageData[1]}`

    if (!acc[key]) {
      acc[key] = [] // Initialize the array if it doesn't exist
    }
    acc[key].push(errorCode)

    return acc
  }, {})
}
