// Custome Domain Error
class DomainError extends Error {
    constructor(message) {
        super(message)

        // Ensure the name of this error is the same as the class name
        this.name = this.constructor.name

        // Domain Error Flasg
        this.domain = true

        // Status Code
        this.httpStatus = 500
        this.grpcStatus = 2

        // This clips the constructor invocation from the stack trace.
        // It's not absolutely essential, but it does make the stack trace a little nicer.
        Error.captureStackTrace(this, this.constructor)
    }
}

// Internal Error
class InternalError extends DomainError {
    constructor(message, stack = null) {
        super(message)

        // Stack Capturing
        if (stack) {
            this.stack = stack
        }

        this.grpcStatus = 13
    }
}

// Bad Request Error
class BadRequestError extends DomainError {
    constructor(message, stack = null) {
        super(message)

        // Stack Capturing
        if (stack) {
            this.stack = stack
        }

        this.httpStatus = 400
        this.grpcStatus = 9
    }
}

// Not Found Error
class NotFoundError extends DomainError {
    constructor(message, stack = null) {
        super(message)

        // Stack Capturing
        if (stack) {
            this.stack = stack
        }

        this.httpStatus = 404
        this.grpcStatus = 5
    }
}

// Invalid Argument Error
class InvalidArgumentError extends DomainError {
    constructor(message, stack = null) {
        super(message)

        // Stack Capturing
        if (stack) {
            this.stack = stack
        }

        this.httpStatus = 422
        this.grpcStatus = 3
    }
}

// Forbidden Error
class ForbiddenError extends DomainError {
    constructor(message, stack = null) {
        super(message)

        // Stack Capturing
        if (stack) {
            this.stack = stack
        }

        this.httpStatus = 403
        this.grpcStatus = 11 // gRPC OUT_OF_RANGE
    }
}

// Unauthorised Error
class UnauthorisedError extends DomainError {
    constructor(message, stack = null) {
        super(message)

        // Stack Capturing
        if (stack) {
            this.stack = stack
        }

        this.httpStatus = 401
        this.grpcStatus = 16
    }
}

// Already Exist Error
class AlreadyExistError extends DomainError {
    constructor(message, stack = null) {
        super(message)

        // Stack Capturing
        if (stack) {
            this.stack = stack
        }

        this.httpStatus = 422
        this.grpcStatus = 6
    }
}

// Timeout Error
class TimeoutError extends DomainError {
    constructor(message, stack = null) {
        super(message)

        // Stack Capturing
        if (stack) {
            this.stack = stack
        }

        this.httpStatus = 408
        this.grpcStatus = 4
    }
}

// Unimplemented Error
class UnimplementedError extends DomainError {
    constructor(message, stack = null) {
        super(message)

        // Stack Capturing
        if (stack) {
            this.stack = stack
        }

        this.httpStatus = 501
        this.grpcStatus = 12
    }
}

// Precondition Failed Error
class PreconditionFailedError extends DomainError {
    constructor(message, stack = null) {
        super(message)

        // Stack Capturing
        if (stack) {
            this.stack = stack
        }

        this.httpStatus = 412
        this.grpcStatus = 9
    }
}

// Bad Gateway Error
class BadGatewayError extends DomainError {
    constructor(message, stack = null) {
        super(message)

        // Stack Capturing
        if (stack) {
            this.stack = stack
        }

        this.httpStatus = 502
        this.grpcStatus = 10
    }
}

// Checks whether the error is Domain Error or not
function isDomainError(err) {
    return err instanceof DomainError
}

// Exporting
module.exports = {
    DomainError,
    InternalError,
    BadRequestError,
    BadGatewayError,
    NotFoundError,
    InvalidArgumentError,
    UnauthorisedError,
    ForbiddenError,
    AlreadyExistError,
    TimeoutError,
    UnimplementedError,
    PreconditionFailedError,
    isDomainError
};