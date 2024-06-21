import mongoose from 'mongoose';
import { ValidationError, DuplicateError, ServerError, CustomError } from './errors.js';

//========= a reusable function which receives error and initalized with appropriate error class ======//
export const handleErrors = (error) => {
    //======= initalized with validation error class ======//
    if (error instanceof mongoose.Error.ValidationError) {
        throw new ValidationError(error.message);
    }

    //======= initalized duplicate error class when error is mongoose duplicate error ==//
    if (error.code && error.code === 11000) {
        throw new DuplicateError('User with this email already exists.');
    }

    //====== this is custom error create by developer while validating input ====//
    if (error instanceof CustomError) {
        throw error;
    }

    throw new ServerError('Something went wrong.');
};
