/**
 * Message keys used for identifying specific error or status messages in the application.
 *
 * @constant
 * @type {Object<string, string>}
 */
export const MESSAGE_KEY = {
  /**
   * Connecting to Database Failed
   * Indicates that the application was unable to establish a connection to the database.
   */
  CONNECTING_TO_DATABASE_FAILED: "connecting-to-database-failed",

  /**
   * Not Authorized
   * Indicates that the user is not authorized to perform the requested action or access the resource.
   */
  NOT_AUTHORIZED: "not-authorized",

  /**
   * Email must be valid
   * todo
   */
  EMAIL_MUST_BE_VALID: "email-must-be-valid",

  /**
   * Email In Use
   * todo
   */
  EMAIL_IN_USE: "email-in-use",

  /**
   * Password Must Not Be Empty
   * Indicates that the password field cannot be left empty.
   */
  PASSWORD_MUST_NOT_BE_EMPTY: "password-must-not-be-empty",

  /**
   * Password Must Be At Least 7 Characters Long
   * Indicates that the password must have a minimum length of 7 characters.
   */
  PASSWORD_MUST_BE_AT_LEAST_7_CHARACTERS_LONG:
    "password-must-be-at-least-7-characters-long",

  /**
   * Password Must Contain At Least One Uppercase Letter
   * Indicates that the password must include at least one uppercase letter.
   */
  PASSWORD_MUST_CONTAIN_AT_LEAST_ONE_UPPERCASE_LETTER:
    "password-must-contain-at-least-one-uppercase-letter",

  /**
   * Password Must Contain At Least One Number
   * Indicates that the password must include at least one numeric digit.
   */
  PASSWORD_MUST_CONTAIN_AT_LEAST_ONE_NUMBER:
    "password-must-contain-at-least-one-number",

  /**
   * Password Must Contain At Least One Special Character
   * Indicates that the password must include at least one special character.
   */
  PASSWORD_MUST_CONTAIN_AT_LEAST_ONE_SPECIAL_CHARACTER:
    "password-must-contain-at-least-one-special-character",

  /**
   * Not Found
   * Indicates that the requested resource could not be found.
   */
  NOT_FOUND: "not-found",

  /**
   * Invalid Request Parameters
   * Indicates that the request contains invalid or missing parameters.
   */
  INVALID_REQUEST_PARAMETERS: "invalid-request-parameters",

  /**
   * Invalid Credentials
   * todo
   */
  INVALID_CREDENTIALS: "invalid-credentials",
};

/**
 * todo.
 *
 * @constant
 * @type {Object<string, string>}
 */
export const FIELD_KEY = {
  NAME: "name",
  EMAIL: "email",
  PASSWORD: "password",
  PASSWORD_CONFIRMATION: "password-confirmation",
};

/**
 * HTTP Status Codes with detailed explanations for IntelliSense.
 *
 * @constant
 * @type {Object<string, number>}
 */
export const STATUS_CODE = {
  /**
   * 100 Continue
   * The server has received the request headers, and the client should proceed to send the request body.
   * Typically used with `Expect: 100-continue` headers.
   */
  _100: 100,

  /**
   * 101 Switching Protocols
   * The requester has asked the server to switch protocols, and the server has agreed to do so.
   */
  _101: 101,

  /**
   * 102 Processing (WebDAV; RFC 2518)
   * Indicates that the server has received and is processing the request, but no response is available yet.
   */
  _102: 102,

  /**
   * 103 Early Hints (RFC 8297)
   * Used to return some response headers before the final HTTP message.
   */
  _103: 103,

  /**
   * 200 OK
   * Standard response for successful HTTP requests.
   * - For a GET request, the response contains the requested resource.
   * - For a POST request, the response describes or contains the result of the action.
   */
  _200: 200,

  /**
   * 201 Created
   * The request has been fulfilled, resulting in the creation of a new resource.
   */
  _201: 201,

  /**
   * 202 Accepted
   * The request has been accepted for processing, but the processing has not been completed.
   * It may or may not be eventually acted upon.
   */
  _202: 202,

  /**
   * 203 Non-Authoritative Information
   * The server is a transforming proxy (e.g., Web accelerator) that received a 200 OK from the origin,
   * but is returning a modified version of the origin's response.
   */
  _203: 203,

  /**
   * 204 No Content
   * The server successfully processed the request, but is not returning any content.
   */
  _204: 204,

  /**
   * 205 Reset Content
   * The server successfully processed the request and asks the requester to reset its document view.
   * No content is returned.
   */
  _205: 205,

  /**
   * 206 Partial Content
   * The server is delivering part of the resource due to a range header sent by the client.
   * This is used to enable resuming of interrupted downloads or split a download into multiple streams.
   */
  _206: 206,

  /**
   * 207 Multi-Status (WebDAV; RFC 4918)
   * The message body contains an XML message with multiple response codes, depending on sub-requests made.
   */
  _207: 207,

  /**
   * 208 Already Reported (WebDAV; RFC 5842)
   * Members of a DAV binding have already been enumerated in a preceding part of the (multistatus) response,
   * and are not included again.
   */
  _208: 208,

  /**
   * 226 IM Used (RFC 3229)
   * The server has fulfilled a request for the resource, and the response is a representation
   * of one or more instance-manipulations applied to the current instance.
   */
  _226: 226,

  /**
   * 300 Multiple Choices
   * Indicates multiple options for the resource from which the client may choose.
   * Commonly used for agent-driven content negotiation, such as selecting video formats or file extensions.
   */
  _300: 300,

  /**
   * 301 Moved Permanently
   * This and all future requests should be directed to the given URI.
   */
  _301: 301,

  /**
   * 302 Found (Previously "Moved Temporarily")
   * Tells the client to temporarily redirect to another URL.
   * Historically, this status code led to browsers changing the request method to GET.
   */
  _302: 302,

  /**
   * 303 See Other (since HTTP/1.1)
   * The response can be found under another URI using the GET method.
   * Typically used after a POST request to redirect the client to a confirmation page.
   */
  _303: 303,

  /**
   * 304 Not Modified
   * Indicates that the resource has not been modified since the specified version in the request headers.
   * The client can use its cached version of the resource.
   */
  _304: 304,

  /**
   * 305 Use Proxy (since HTTP/1.1)
   * Indicates that the requested resource is only accessible through a proxy.
   * For security reasons, most HTTP clients do not support this status code.
   */
  _305: 305,

  /**
   * 306 Switch Proxy
   * No longer used.
   * Originally meant that subsequent requests should use a specified proxy.
   */
  _306: 306,

  /**
   * 307 Temporary Redirect (since HTTP/1.1)
   * The request should be repeated with another URI, but future requests should still use the original URI.
   * Unlike 302, the request method is not allowed to change.
   */
  _307: 307,

  /**
   * 308 Permanent Redirect
   * This and all future requests should be directed to the given URI.
   * Similar to 301 but ensures the HTTP method does not change.
   */
  _308: 308,

  /**
   * 400 Bad Request
   * The server cannot or will not process the request due to client error (e.g., malformed request syntax, size too large).
   */
  _400: 400,

  /**
   * 401 Unauthorized
   * Authentication is required and has failed or has not been provided. The response includes a WWW-Authenticate header with applicable challenge details.
   */
  _401: 401,

  /**
   * 402 Payment Required
   * Reserved for future use. Some APIs use this to indicate quota exceeded or payment-related issues.
   */
  _402: 402,

  /**
   * 403 Forbidden
   * The server understands the request but refuses to authorize it. Typically due to insufficient permissions.
   */
  _403: 403,

  /**
   * 404 Not Found
   * The requested resource could not be found but may be available in the future.
   */
  _404: 404,

  /**
   * 405 Method Not Allowed
   * The HTTP method used is not supported by the target resource (e.g., GET on a POST-only endpoint).
   */
  _405: 405,

  /**
   * 406 Not Acceptable
   * The server cannot produce a response matching the Accept headers sent by the client.
   */
  _406: 406,

  /**
   * 407 Proxy Authentication Required
   * The client must first authenticate itself with the proxy.
   */
  _407: 407,

  /**
   * 408 Request Timeout
   * The server timed out waiting for the request. The client may retry without modifications.
   */
  _408: 408,

  /**
   * 409 Conflict
   * The request could not be processed due to a conflict with the current state of the resource (e.g., edit conflicts).
   */
  _409: 409,

  /**
   * 410 Gone
   * The requested resource is no longer available and will not be available again.
   */
  _410: 410,

  /**
   * 411 Length Required
   * The request did not specify the length of its content, which is required.
   */
  _411: 411,

  /**
   * 412 Precondition Failed
   * The server does not meet one of the preconditions specified in the request headers.
   */
  _412: 412,

  /**
   * 413 Payload Too Large
   * The request payload is larger than the server is willing or able to process.
   */
  _413: 413,

  /**
   * 414 URI Too Long
   * The URI provided was too long for the server to process.
   */
  _414: 414,

  /**
   * 415 Unsupported Media Type
   * The request entity has a media type unsupported by the server or resource.
   */
  _415: 415,

  /**
   * 416 Range Not Satisfiable
   * The client requested a range not available in the target resource.
   */
  _416: 416,

  /**
   * 417 Expectation Failed
   * The server cannot meet the requirements of the Expect request-header field.
   */
  _417: 417,

  /**
   * 418 I'm a teapot
   * Defined in RFC 2324 as a joke. Returned by teapots that receive coffee requests.
   */
  _418: 418,

  /**
   * 421 Misdirected Request
   * The request was directed to a server unable to produce a response.
   */
  _421: 421,

  /**
   * 422 Unprocessable Content
   * The request is syntactically correct but cannot be processed.
   */
  _422: 422,

  /**
   * 423 Locked (WebDAV)
   * The resource is locked and cannot be accessed.
   */
  _423: 423,

  /**
   * 424 Failed Dependency (WebDAV)
   * The request failed because it depended on another request that failed.
   */
  _424: 424,

  /**
   * 425 Too Early
   * The server is unwilling to process the request due to potential replay risks.
   */
  _425: 425,

  /**
   * 426 Upgrade Required
   * The client should switch to a different protocol (e.g., TLS/1.3).
   */
  _426: 426,

  /**
   * 428 Precondition Required
   * The server requires the request to be conditional to prevent conflicts (e.g., lost updates).
   */
  _428: 428,

  /**
   * 429 Too Many Requests
   * The client has sent too many requests in a given amount of time (rate limiting).
   */
  _429: 429,

  /**
   * 431 Request Header Fields Too Large
   * The request headers are too large (individually or collectively) for the server to process.
   */
  _431: 431,

  /**
   * 451 Unavailable For Legal Reasons
   * The resource is unavailable due to legal reasons, such as censorship or legal demands.
   */
  _451: 451,

  /**
   * 500 Internal Server Error
   * A generic error message indicating the server encountered an unexpected condition that prevented it from fulfilling the request.
   */
  _500: 500,

  /**
   * 501 Not Implemented
   * The server does not recognize the request method or lacks the ability to fulfill it. Usually implies that the feature is not supported.
   */
  _501: 501,

  /**
   * 502 Bad Gateway
   * The server, acting as a gateway or proxy, received an invalid response from the upstream server.
   */
  _502: 502,

  /**
   * 503 Service Unavailable
   * The server is currently unable to handle the request due to temporary overload or maintenance.
   */
  _503: 503,

  /**
   * 504 Gateway Timeout
   * The server, acting as a gateway or proxy, did not receive a timely response from the upstream server.
   */
  _504: 504,

  /**
   * 505 HTTP Version Not Supported
   * The server does not support the HTTP protocol version used in the request.
   */
  _505: 505,

  /**
   * 506 Variant Also Negotiates
   * Transparent content negotiation for the request resulted in a circular reference.
   */
  _506: 506,

  /**
   * 507 Insufficient Storage (WebDAV)
   * The server is unable to store the representation needed to complete the request.
   */
  _507: 507,

  /**
   * 508 Loop Detected (WebDAV)
   * The server detected an infinite loop while processing the request.
   */
  _508: 508,

  /**
   * 510 Not Extended
   * Further extensions to the request are required for the server to fulfill it.
   */
  _510: 510,

  /**
   * 511 Network Authentication Required
   * The client must authenticate to gain network access, often used in captive portals requiring user agreement before full access.
   */
  _511: 511,
};
