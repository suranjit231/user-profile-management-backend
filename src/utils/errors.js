
//====== Custom error class to handle application errors =======//
class AppError extends Error {
     //===== Constructor to initialize the error message and status code ===//
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; //-- Status type ('fail' for client errors, 'error' for server errors)
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

//===== Subclass of AppError for validation errors (HTTP 400) =====//
class ValidationError extends AppError {
    constructor(message) {
        super(message, 400);
    }
}

//===== Subclass of AppError for duplicate key errors (HTTP 409) ===//
class DuplicateError extends AppError {q
    constructor(message) {
        super(message, 409);
    }
}

//==== Subclass of AppError for server errors (HTTP 500) ====//
class ServerError extends AppError {
    constructor(message) {
        super(message, 500);
    }
}

//==== Subclass of AppError for custom errors with a user-defined status code ===//
class CustomError extends AppError {
    constructor(message, statusCode) {
        super(message, statusCode);
    }
}

export { AppError, ValidationError, DuplicateError, ServerError, CustomError };
