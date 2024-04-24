const { HTTP_CODES } = require("./http_responses");

class BadRequestException extends Error {
    constructor(message, err = null) {
        super(message);
        this.type = 'Bad Request';
        this.statusCode = HTTP_CODES.BAD_REQUEST;
        this.err = err;
    }
}

class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.type = 'Error';
        this.statusCode = statusCode;
    }
}

class UnauthorizedException extends Error {
    constructor(message) {
        super(message);
        this.type = 'Unauthorized';
        this.statusCode = HTTP_CODES.UNAUTHORIZED;
    }
}

class NotFoundException extends Error {
    constructor(message) {
        super(message);
        this.type = 'Not Found';
        this.statusCode = HTTP_CODES.NOT_FOUND;
    }
}

class PreconditionException extends Error {
    constructor(message, err = null) {
        super(message);
        this.type = 'Precondition Failed';
        this.statusCode = HTTP_CODES.PRECONDITION_FAILED;
        this.err = err;
    }
}

class UnHandledException extends Error {
    constructor(err = null) {
        const message = 'Internal Server Error';
        super(message);
        this.type = 'Internal Server Error';
        this.err = err;
        this.statusCode = HTTP_CODES.INTERNAL_SERVER_ERROR;
    }
}

module.exports = {
    BadRequestException,
    NotFoundException,
    PreconditionException,
    UnauthorizedException,
    UnHandledException,
    ErrorResponse,
};

