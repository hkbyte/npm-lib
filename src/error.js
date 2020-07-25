const { InternalError, BadRequestError, NotFoundError, InvalidArgumentError, ForbiddenError, UnauthorisedError, AlreadyExistError, TimeoutError, PreconditionFailedError, UnimplementedError, BadGatewayError } = require("./errors")

/**
 * Internal Error (HTTP Status: 500, gRPC Status: 13)
 * @param {string} message Error message
 * @param {Array} [stack=] Error Stock
 * @returns {InternalError} Error
 */
function Internal(message, stack = null) {
    return new InternalError(message, stack)
}

/**
 * Bad Request Error (HTTP Status: 400, gRPC Status: 9)
 * @param {string} message Error message
 * @param {Array} [stack=] Error Stock
 * @returns {BadRequestError} Error
 */
function BadRequest(message, stack = null) {
    return new BadRequestError(message, stack)
}

/**
 * Not Found Error (HTTP Status: 404, gRPC Status: 5)
 * @param {string} message Error message
 * @param {Array} [stack=] Error Stock
 * @returns {NotFoundError} Error
 */
function NotFound(message, stack = null) {
    return new NotFoundError(message, stack)
}

/**
 * Invalid Argument Error (HTTP Status: 422, gRPC Status: 3)
 * @param {string} message Error message
 * @param {Array} [stack=] Error Stock
 * @returns {InvalidArgument} Error
 */
function InvalidArgument(message, stack = null) {
    return new InvalidArgumentError(message, stack)
}

/**
 * Forbidden Error (HTTP Status: 403, gRPC Status: 11 (OUT_OF_RANGE))
 * @param {string} message Error message
 * @param {Array} [stack=] Error Stock
 * @returns {ForbiddenError} Error
 */
function Forbidden(message, stack = null) {
    return new ForbiddenError(message, stack)
}

/**
 * Unauthorised Error (HTTP Status: 401, gRPC Status: 16 (OUT_OF_RANGE))
 * @param {string} message Error message
 * @param {Array} [stack=] Error Stock
 * @returns {UnauthorisedError} Error
 */
function Unauthorised(message, stack = null) {
    return new UnauthorisedError(message, stack)
}

/**
 * Already Exist Error (HTTP Status: 422, gRPC Status: 6)
 * @param {string} message Error message
 * @param {Array} [stack=] Error Stock
 * @returns {AlreadyExistError} Error
 */
function AlreadyExist(message, stack = null) {
    return new AlreadyExistError(message, stack)
}

/**
 * Timeout Error (HTTP Status: 408, gRPC Status: 4)
 * @param {string} message Error message
 * @param {Array} [stack=] Error Stock
 * @returns {TimeoutError} Error
 */
function Timeout(message, stack = null) {
    return new TimeoutError(message, stack)
}

/**
 * Unimplemented Error (HTTP Status: 501, gRPC Status: 12)
 * @param {string} message Error message
 * @param {Array} [stack=] Error Stock
 * @returns {UnimplementedError} Error
 */
function Unimplemented(message, stack = null) {
    return new UnimplementedError(message, stack)
}

/**
 * Precondition Failed Error (HTTP Status: 412, gRPC Status: 9)
 * @param {string} message Error message
 * @param {Array} [stack=] Error Stock
 * @returns {PreconditionFailedError} Error
 */
function PreconditionFailed(message, stack = null) {
    return new PreconditionFailedError(message, stack)
}

/**
 * Bad Gateway Error (HTTP Status: 502, gRPC Status: 10)
 * @param {string} message Error message
 * @param {Array} [stack=] Error Stock
 * @returns {BadGatewayError} Error
 */
function BadGateway(message, stack = null) {
    return new BadGatewayError(message, stack)
}

// Exporting
module.exports = {
    Internal,
    BadRequest,
    NotFound,
    InvalidArgument,
    Forbidden,
    Unauthorised,
    AlreadyExist,
    Timeout,
    Unimplemented,
    PreconditionFailed,
    BadGateway
}