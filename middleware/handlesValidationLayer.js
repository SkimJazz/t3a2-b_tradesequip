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
        if (!job) throw new NotFoundError(`no job with id : ${value} found`);
        // console.log(req, job);

        /**
         * SUPER ACCESS TO ALL ACCOUNT JOBS IN THE DATABASE: Implementation 1
         * ---------------------------------------------------------------------------------
         * The code block below checks if the user is a super(admin) or an owner(user) of the
         * job before allowing access to the route. If the user is neither a super nor the
         * owner of the job, it throws an UnauthorizedError. This is the expected behavior.
         *
         * The super holds the highest level of access in the application. They can access all
         * accounts in the database. The owner of the job is the user who created the job. They
         * can access only their job account. The code block below ensures that only the super
         * or the owner of the job can access the route.
         *
         * @type {boolean}
         * @constant {boolean} "isSuper" - Indicates if the user has the 'super' role.
         * @constant {boolean} isOwner - Indicates if the user is the owner of the job.
         * @throws {UnauthorizedError} If the user is neither a super nor the owner of the job.
         * ---------------------------------------------------------------------------------
         */
        // const isSuper = req.user.role === 'super';
        // const isOwner = req.user.userId === job.createdBy.toString();
        // if (!isSuper && !isOwner)
        //     throw new UnauthorizedError('not authorized to access this route');


        /**
         * ONLY OWNER ACCESS TO CLIENT ACCOUNT: Implementation 2 (Preferred)
         * ---------------------------------------------------------------------------------
         * This code block checks if the user is the owner of the job regardless of the
         * user's role (super or user). If the user is not the owner of the job, it throws
         * an UnauthorizedError. This is the expected behavior.
         *
         * @constant {boolean} whoIsJobOwner - Indicates if the user is the owner of the job.
         * @throws {UnauthorizedError} If the user is not the owner of the job.
         * ---------------------------------------------------------------------------------
         * */
        const whoIsJobOwner = req.user.userId === job.createdBy.toString();
        if (!whoIsJobOwner)
            // Triggered if user is not owner of job. However, this indicates that the ID is valid
            throw new UnauthorizedError('not authorized to access this route');
    }),
]);


// ---------------------------- CLIENT VALIDATION LAYER ---------------------------- //


export const validateClientInput = withValidationErrors([
    body('clientCompName')
        .notEmpty()
        .withMessage('client company name is required'),
    body('clientAddress')
        .notEmpty()
        .withMessage('client address is required'),
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


        /**
         * SUPER ACCESS TO ALL ACCOUNT CLIENTS IN THE DATABASE: Implementation 1
         * ---------------------------------------------------------------------------------
         * The code block below checks if the user is a super(admin) or an owner(user) of the
         * client before allowing access to the route. If the user is neither a super nor the
         * owner of the client, it throws an UnauthorizedError. This is the expected behavior.
         *
         * The super holds the highest level of access in the application. They can access all
         * accounts in the database. The owner of the client is the user who created the client.
         * They can access only their client account. The code block below ensures that only
         * the super or the owner of the client can access the route.
         *
         * @type {boolean}
         * @constant {boolean} "isSuper" - Indicates if the user has the 'super' role.
         * @constant {boolean} isOwner - Indicates if the user is the owner of the client.
         * @throws {UnauthorizedError} If the user is neither a super nor the owner of the client.
         * ---------------------------------------------------------------------------------
         */
        // const isSuper = req.user.role === 'super';
        // const isOwner = req.user.userId === client.createdBy.toString();
        // if (!isSuper && !isOwner)
        //     throw new UnauthorizedError('not authorized to access this route');


        /**
         * ONLY OWNER ACCESS TO CLIENT ACCOUNT: Implementation 2 (Preferred)
         * ---------------------------------------------------------------------------------
         * This code block checks if the user is the owner of the client regardless of the
         * user's role (super or user). If the user is not the owner of the client, it throws
         * an UnauthorizedError, even if the user is a super. This is the expected behavior.
         *
         * @constant {boolean} whoIsClientOwner - Indicates if the user is the owner of the client.
         * @throws {UnauthorizedError} If the user is not the owner of the client.
         * ---------------------------------------------------------------------------------
         */
        const whoIsClientOwner = req.user.userId === client.createdBy.toString();
        if (!whoIsClientOwner)
            // Ref: validateIdParam function for UnauthorizedError
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

