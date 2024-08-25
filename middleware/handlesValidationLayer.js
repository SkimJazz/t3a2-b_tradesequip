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
import Client from '../models/ClientModel.js';


const withValidationErrors = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            /**
             * validationResult(req)
             *
             * validationResult(req) is a function provided by express-validator
             * that takes the incoming request object req as an argument. It checks
             * the request for any validation errors that were defined earlier in
             * the middleware chain.
             */
            const errors = validationResult(req);
            // console.log(errors);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map((error) => error.msg);

                // 404 Not Found Error StatusCode. Ref validateIdParam function
                if (errorMessages[0].startsWith('no job')) {
                    throw new NotFoundError(errorMessages);
                }
                if (errorMessages[0].startsWith('no client')) {
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


// ---------------------------- JOB VALIDATION LAYER ---------------------------- //


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


export const validateJobIdParam = withValidationErrors([
    param('id').custom(async(value, { req }) => {

        const isValidIdMongoId = mongoose.Types.ObjectId.isValid(value);
        if (!isValidIdMongoId) throw new BadRequestError('invalid MongoDB id');

        const job = await Job.findById(value);
        if (!job) throw new NotFoundError(`no job with id : ${value}`);
        // console.log(req, job);

        // Check if user making request is an SuperUser
        const isSuper = req.user.role === 'super';

        // Check if user is creator of job -> use .toString() to convert ObjectId to string
        // or createdBy will be false
        const isOwner = req.user.userId === job.createdBy.toString();
        // If user is not an SuperUser and is not the Owner of the job
        if (!isSuper && !isOwner)
            // This error message must be same as one in withValidationErrors function
            // or it will not display the 403 Unauthorized error message
            throw new UnauthorizedError('not authorized to access this route');

    }),
]);


// ---------------------------- CLIENT VALIDATION LAYER ---------------------------- //


export const validateClientInput = withValidationErrors([
    // body('clientCompName')
    //     .notEmpty()
    //     .withMessage('client company name is required'),
    // body('clientAddress')
    //     .notEmpty()
    //     .withMessage('client address is required'),
    body('projectContact')
        .notEmpty()
        .withMessage('project contact is required'),
]);


export const validateClientIdParam = withValidationErrors([
    param('id').custom(async (value, { req }) => {

        const isValidIdMongoId = mongoose.Types.ObjectId.isValid(value);
        if (!isValidIdMongoId) throw new BadRequestError('invalid MongoDB client id');

        const client = await Client.findById(value);
        if (!client) throw new NotFoundError(`no client with id : ${value} found`);

        const isSuper = req.user.role === 'super';
        const isOwner = req.user.userId === client.createdBy.toString();
        if (!isSuper && !isOwner)
            throw new UnauthorizedError('not authorized to access this route');
    }),
]);


// ---------------------------- USER VALIDATION LAYER ---------------------------- //


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

