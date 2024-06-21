import { AppError } from '../utils/errors.js';
import mongoose from 'mongoose';
//============== Custom error handling middleware ==================//
const errorHandler = (err, req, res, next) => {
   // console.error('Error:', err);

     //======== Handle Mongoose validation errors ===========//
    if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({
            status: 'fail',
            message: err.message,
            details: err.errors,
        });
    }

    //========== Handle Mongoose duplicate key errors like email ========//
    if (err.code && err.code === 11000) {
        const message = `Duplicate key error: ${Object.keys(err.keyValue).join(', ')}`;
        return res.status(409).json({
            status: 'fail',
            message: message,
        });
    }

    //=========== Handle custom application errors (like empty input, not found) ====//
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }

    //=========== Handle all other unexpected errors ===========//
    return res.status(500).json({
        status: 'error',
        message: 'An unexpected error occurred',
    });
};

export default errorHandler;
