// Validation layer using the 'express-validator library'. Checks the values of
// the request body and query parameters before they are passed to the controller
// functions. Can be reused in multiple controllers across other projects.

// Library imports
import mongoose from "mongoose";
import { body, param, validationResult } from 'express-validator';

// Local imports (need .js extension)
import {BadRequestError, NotFoundError } from '../errors/customErrors.js';
import {JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import Job from '../models/JobModel.js';


const withValidationErrors = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map((error) => error.msg);

                // 404 Not Found Error StatusCode. Ref validateIdParam function
                if (errorMessages[0].startsWith('no job')) {
                    throw new NotFoundError(errorMessages);
                }
                throw new BadRequestError(errorMessages);
            }
            next();
        },
    ];
};

// Exported to jobRouter.js file
export const validateJobInput = withValidationErrors([
    body('clientName')
        .notEmpty()
        .withMessage('client name is required'),
    body('jobTitle')
        .notEmpty()
        .withMessage('job title is required'),
    body('jobLocation')
        .notEmpty()
        .withMessage('job location is required'),
    body('jobStatus')
        // object.values (BUILT IN TO JS) returns an array of values of the JOB_STATUS object
        .isIn(Object.values(JOB_STATUS))
        .withMessage('invalid status value'),
    body('jobType')
        .isIn(Object.values(JOB_TYPE))
        .withMessage('invalid job type'),
]);


/**
 * Middleware to validate the 'id' parameter in the request URL.
 *
 * This middleware ensures that the 'id' parameter is a valid MongoDB ObjectId
 * and that a job with the given 'id' exists in the database before the request
 * is processed by the controller functions.
 *
 * @param {Array} validateValues - Array of validation rules.
 * @returns {Array} - Array containing the validation rules and an error-handling
 * middleware.
 *
 *
 * WARNING!! Cast to ObjectId failed:
 * Cast to ObjectId failed for value "random id number" at path "_id" for model "Job"
 * This error occurs when the 'id' parameter is not a valid MongoDB ObjectId. Say if
 * the id is not the correct length of characters.
 * This error is thrown by Mongoose when it tries to cast the 'id' parameter to an
 * ObjectId. A 500 Internal Server Error is returned to the client saying the following
 * message:
 *
 * "Cast to ObjectId failed for value \"66b816cdf6ca98d48c04250\" (type string) at path \"_id\" for model \"Job\""
 *
 * To stop this error from being thrown, we need to add the 'validateIdParam' parameter
 * to the route handler in the jobRouter.js file.
 *
 * @example
 * // jobRouter.js
 * router
 *    .route('/:id')
 *    .get(validateIdParam, getJobById) => validateIdParam is added here
 *    .patch(validateJobInput, validateIdParam, updateJobById) => validateIdParam is added here
 *    .delete(validateIdParam, deleteJobById); => validateIdParam is added here
 *
 *
 */
export const validateIdParam = withValidationErrors([

    param('id').custom(async (value) => {
        const isValidId = mongoose.Types.ObjectId.isValid(value);
        if (!isValidId) throw new BadRequestError('invalid MongoDB id');
        const job = await Job.findById(value);
        if (!job) throw new NotFoundError(`no job with id : ${value}`);
    }),
]);



