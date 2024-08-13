// Validation layer using the 'express-validator library'. Checks the values of
// the request body and query parameters before they are passed to the controller
// functions. Can be reused in multiple controllers across other projects.

// Library imports
import mongoose from "mongoose";
import { body, param, validationResult } from 'express-validator';

// Local imports (need .js extension)
import {BadRequestError, NotFoundError, UnauthorizedError} from '../errors/customErrors.js';
import {JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import Job from '../models/JobModel.js';
import User from '../models/UserModel.js';


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
                if (errorMessages[0].startsWith('not authorized')) {
                    throw new UnauthorizedError('not authorized to access this route');
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
    param('id').custom(async(value, { req }) => {

        const isValidIdMongoId = mongoose.Types.ObjectId.isValid(value);
        if (!isValidIdMongoId) throw new BadRequestError('invalid MongoDB id');

        const job = await Job.findById(value);
        if (!job) throw new NotFoundError(`no job with id : ${value}`);
        // console.log(req, job);

        // Check if user making request is an Admin
        const isAdmin = req.user.role === 'admin';

        // Check if user is the creator of the job -> use .toString() to convert the ObjectId to a string
        // or createdBy will be false
        const isOwner = req.user.userId === job.createdBy.toString();
        // If user is not an Admin and is not the Owner of the job
        if (!isAdmin && !isOwner)
            // This error message must be the same as the one in the withValidationErrors function
            // or it will not display the 403 Unauthorized error message
            throw new UnauthorizedError('not authorized to access this route');

    }),
]);



export const validateSignupInput = withValidationErrors([
    body('name')
        .notEmpty()
        .withMessage('name is required'),
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('invalid email address')
        .custom(async (email) => {
            const user = await User.findOne({ email });
            if (user) {
                throw new BadRequestError('email already exists');
            }
        }),

    body('password')
        .notEmpty()
        .withMessage('password is required')
        .isLength({ min: 8 })
        .withMessage('password must be at least 8 characters long'),
    body('location')
        .notEmpty()
        .withMessage('location is required'),
    body('lastName')
        .notEmpty()
        .withMessage('last name is required'),
]);


export const validateLoginInput = withValidationErrors([
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('invalid email format'),

    body('password')
        .notEmpty()
        .withMessage('password is required'),
]);


export const validateUpdateUserInput = withValidationErrors([
    body('name').notEmpty().withMessage('name is required'),
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('invalid email format')
        .custom(async (email, { req }) => {

            // Check if email already exists in the database
            const user = await User.findOne({ email });
            // If email exists and the user is not the same user making the request
            if (user && user._id.toString() !== req.user.userId) {
                throw new Error('email already exists');
            }
        }),
    body('lastName').notEmpty().withMessage('last name is required'),
    body('location').notEmpty().withMessage('location is required'),
]);

