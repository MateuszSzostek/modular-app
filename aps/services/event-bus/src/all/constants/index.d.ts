/**
 * Message keys used for identifying specific error or status messages in the application.
 *
 * @constant
 * @type {Object<string, string>}
 */
export declare const MESSAGE_KEY: {
    /**
     * Connecting to Database Failed
     * Indicates that the application was unable to establish a connection to the database.
     */
    CONNECTING_TO_DATABASE_FAILED: string;
    /**
     * Not Authorized
     * Indicates that the user is not authorized to perform the requested action or access the resource.
     */
    NOT_AUTHORIZED: string;
    /**
     * Password Must Not Be Empty
     * Indicates that the password field cannot be left empty.
     */
    PASSWORD_MUST_NOT_BE_EMPTY: string;
    /**
     * Password Must Be At Least 7 Characters Long
     * Indicates that the password must have a minimum length of 7 characters.
     */
    PASSWORD_MUST_BE_AT_LEAST_7_CHARACTERS_LONG: string;
    /**
     * Password Must Contain At Least One Uppercase Letter
     * Indicates that the password must include at least one uppercase letter.
     */
    PASSWORD_MUST_CONTAIN_AT_LEAST_ONE_UPPERCASE_LETTER: string;
    /**
     * Password Must Contain At Least One Number
     * Indicates that the password must include at least one numeric digit.
     */
    PASSWORD_MUST_CONTAIN_AT_LEAST_ONE_NUMBER: string;
    /**
     * Password Must Contain At Least One Special Character
     * Indicates that the password must include at least one special character.
     */
    PASSWORD_MUST_CONTAIN_AT_LEAST_ONE_SPECIAL_CHARACTER: string;
    /**
     * Not Found
     * Indicates that the requested resource could not be found.
     */
    NOT_FOUND: string;
    /**
     * Invalid Request Parameters
     * Indicates that the request contains invalid or missing parameters.
     */
    INVALID_REQUEST_PARAMETERS: string;
};
/**
 * HTTP Status Codes with detailed explanations for IntelliSense.
 *
 * @constant
 * @type {Object<string, number>}
 */
export declare const STATUS_CODE: {
    /**
     * 100 Continue
     * The server has received the request headers, and the client should proceed to send the request body.
     * Typically used with `Expect: 100-continue` headers.
     */
    _100: number;
    /**
     * 101 Switching Protocols
     * The requester has asked the server to switch protocols, and the server has agreed to do so.
     */
    _101: number;
    /**
     * 102 Processing (WebDAV; RFC 2518)
     * Indicates that the server has received and is processing the request, but no response is available yet.
     */
    _102: number;
    /**
     * 103 Early Hints (RFC 8297)
     * Used to return some response headers before the final HTTP message.
     */
    _103: number;
    /**
     * 200 OK
     * Standard response for successful HTTP requests.
     * - For a GET request, the response contains the requested resource.
     * - For a POST request, the response describes or contains the result of the action.
     */
    _200: number;
    /**
     * 201 Created
     * The request has been fulfilled, resulting in the creation of a new resource.
     */
    _201: number;
    /**
     * 202 Accepted
     * The request has been accepted for processing, but the processing has not been completed.
     * It may or may not be eventually acted upon.
     */
    _202: number;
    /**
     * 203 Non-Authoritative Information
     * The server is a transforming proxy (e.g., Web accelerator) that received a 200 OK from the origin,
     * but is returning a modified version of the origin's response.
     */
    _203: number;
    /**
     * 204 No Content
     * The server successfully processed the request, but is not returning any content.
     */
    _204: number;
    /**
     * 205 Reset Content
     * The server successfully processed the request and asks the requester to reset its document view.
     * No content is returned.
     */
    _205: number;
    /**
     * 206 Partial Content
     * The server is delivering part of the resource due to a range header sent by the client.
     * This is used to enable resuming of interrupted downloads or split a download into multiple streams.
     */
    _206: number;
    /**
     * 207 Multi-Status (WebDAV; RFC 4918)
     * The message body contains an XML message with multiple response codes, depending on sub-requests made.
     */
    _207: number;
    /**
     * 208 Already Reported (WebDAV; RFC 5842)
     * Members of a DAV binding have already been enumerated in a preceding part of the (multistatus) response,
     * and are not included again.
     */
    _208: number;
    /**
     * 226 IM Used (RFC 3229)
     * The server has fulfilled a request for the resource, and the response is a representation
     * of one or more instance-manipulations applied to the current instance.
     */
    _226: number;
    /**
     * 300 Multiple Choices
     * Indicates multiple options for the resource from which the client may choose.
     * Commonly used for agent-driven content negotiation, such as selecting video formats or file extensions.
     */
    _300: number;
    /**
     * 301 Moved Permanently
     * This and all future requests should be directed to the given URI.
     */
    _301: number;
    /**
     * 302 Found (Previously "Moved Temporarily")
     * Tells the client to temporarily redirect to another URL.
     * Historically, this status code led to browsers changing the request method to GET.
     */
    _302: number;
    /**
     * 303 See Other (since HTTP/1.1)
     * The response can be found under another URI using the GET method.
     * Typically used after a POST request to redirect the client to a confirmation page.
     */
    _303: number;
    /**
     * 304 Not Modified
     * Indicates that the resource has not been modified since the specified version in the request headers.
     * The client can use its cached version of the resource.
     */
    _304: number;
    /**
     * 305 Use Proxy (since HTTP/1.1)
     * Indicates that the requested resource is only accessible through a proxy.
     * For security reasons, most HTTP clients do not support this status code.
     */
    _305: number;
    /**
     * 306 Switch Proxy
     * No longer used.
     * Originally meant that subsequent requests should use a specified proxy.
     */
    _306: number;
    /**
     * 307 Temporary Redirect (since HTTP/1.1)
     * The request should be repeated with another URI, but future requests should still use the original URI.
     * Unlike 302, the request method is not allowed to change.
     */
    _307: number;
    /**
     * 308 Permanent Redirect
     * This and all future requests should be directed to the given URI.
     * Similar to 301 but ensures the HTTP method does not change.
     */
    _308: number;
    /**
     * 400 Bad Request
     * The server cannot or will not process the request due to client error (e.g., malformed request syntax, size too large).
     */
    _400: number;
    /**
     * 401 Unauthorized
     * Authentication is required and has failed or has not been provided. The response includes a WWW-Authenticate header with applicable challenge details.
     */
    _401: number;
    /**
     * 402 Payment Required
     * Reserved for future use. Some APIs use this to indicate quota exceeded or payment-related issues.
     */
    _402: number;
    /**
     * 403 Forbidden
     * The server understands the request but refuses to authorize it. Typically due to insufficient permissions.
     */
    _403: number;
    /**
     * 404 Not Found
     * The requested resource could not be found but may be available in the future.
     */
    _404: number;
    /**
     * 405 Method Not Allowed
     * The HTTP method used is not supported by the target resource (e.g., GET on a POST-only endpoint).
     */
    _405: number;
    /**
     * 406 Not Acceptable
     * The server cannot produce a response matching the Accept headers sent by the client.
     */
    _406: number;
    /**
     * 407 Proxy Authentication Required
     * The client must first authenticate itself with the proxy.
     */
    _407: number;
    /**
     * 408 Request Timeout
     * The server timed out waiting for the request. The client may retry without modifications.
     */
    _408: number;
    /**
     * 409 Conflict
     * The request could not be processed due to a conflict with the current state of the resource (e.g., edit conflicts).
     */
    _409: number;
    /**
     * 410 Gone
     * The requested resource is no longer available and will not be available again.
     */
    _410: number;
    /**
     * 411 Length Required
     * The request did not specify the length of its content, which is required.
     */
    _411: number;
    /**
     * 412 Precondition Failed
     * The server does not meet one of the preconditions specified in the request headers.
     */
    _412: number;
    /**
     * 413 Payload Too Large
     * The request payload is larger than the server is willing or able to process.
     */
    _413: number;
    /**
     * 414 URI Too Long
     * The URI provided was too long for the server to process.
     */
    _414: number;
    /**
     * 415 Unsupported Media Type
     * The request entity has a media type unsupported by the server or resource.
     */
    _415: number;
    /**
     * 416 Range Not Satisfiable
     * The client requested a range not available in the target resource.
     */
    _416: number;
    /**
     * 417 Expectation Failed
     * The server cannot meet the requirements of the Expect request-header field.
     */
    _417: number;
    /**
     * 418 I'm a teapot
     * Defined in RFC 2324 as a joke. Returned by teapots that receive coffee requests.
     */
    _418: number;
    /**
     * 421 Misdirected Request
     * The request was directed to a server unable to produce a response.
     */
    _421: number;
    /**
     * 422 Unprocessable Content
     * The request is syntactically correct but cannot be processed.
     */
    _422: number;
    /**
     * 423 Locked (WebDAV)
     * The resource is locked and cannot be accessed.
     */
    _423: number;
    /**
     * 424 Failed Dependency (WebDAV)
     * The request failed because it depended on another request that failed.
     */
    _424: number;
    /**
     * 425 Too Early
     * The server is unwilling to process the request due to potential replay risks.
     */
    _425: number;
    /**
     * 426 Upgrade Required
     * The client should switch to a different protocol (e.g., TLS/1.3).
     */
    _426: number;
    /**
     * 428 Precondition Required
     * The server requires the request to be conditional to prevent conflicts (e.g., lost updates).
     */
    _428: number;
    /**
     * 429 Too Many Requests
     * The client has sent too many requests in a given amount of time (rate limiting).
     */
    _429: number;
    /**
     * 431 Request Header Fields Too Large
     * The request headers are too large (individually or collectively) for the server to process.
     */
    _431: number;
    /**
     * 451 Unavailable For Legal Reasons
     * The resource is unavailable due to legal reasons, such as censorship or legal demands.
     */
    _451: number;
    /**
     * 500 Internal Server Error
     * A generic error message indicating the server encountered an unexpected condition that prevented it from fulfilling the request.
     */
    _500: number;
    /**
     * 501 Not Implemented
     * The server does not recognize the request method or lacks the ability to fulfill it. Usually implies that the feature is not supported.
     */
    _501: number;
    /**
     * 502 Bad Gateway
     * The server, acting as a gateway or proxy, received an invalid response from the upstream server.
     */
    _502: number;
    /**
     * 503 Service Unavailable
     * The server is currently unable to handle the request due to temporary overload or maintenance.
     */
    _503: number;
    /**
     * 504 Gateway Timeout
     * The server, acting as a gateway or proxy, did not receive a timely response from the upstream server.
     */
    _504: number;
    /**
     * 505 HTTP Version Not Supported
     * The server does not support the HTTP protocol version used in the request.
     */
    _505: number;
    /**
     * 506 Variant Also Negotiates
     * Transparent content negotiation for the request resulted in a circular reference.
     */
    _506: number;
    /**
     * 507 Insufficient Storage (WebDAV)
     * The server is unable to store the representation needed to complete the request.
     */
    _507: number;
    /**
     * 508 Loop Detected (WebDAV)
     * The server detected an infinite loop while processing the request.
     */
    _508: number;
    /**
     * 510 Not Extended
     * Further extensions to the request are required for the server to fulfill it.
     */
    _510: number;
    /**
     * 511 Network Authentication Required
     * The client must authenticate to gain network access, often used in captive portals requiring user agreement before full access.
     */
    _511: number;
};
//# sourceMappingURL=index.d.ts.map