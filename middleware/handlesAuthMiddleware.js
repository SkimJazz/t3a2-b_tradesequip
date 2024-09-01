// Local imports
import {UnauthenticatedError, BadRequestError, UnauthorizedError} from '../errors/customErrors.js';
import {verifyJWT} from "../utils/tokenUtils.js";

// Demo test user check
export const checkForDemoUser = (req, res, next) => {
    if (req.user.demoUser) {
        throw new BadRequestError('Demo User. Read Only!');
    }
    next();
};


// async removed form this function -> added to the verifyJWT function
export const authenticateUser = (req, res, next) => {
    // console.log(req.cookies);
    const { monster } = req.cookies;
    if (!monster) {
        throw new UnauthenticatedError('authentication invalid');
    }
    try {
        const { userId, role } = verifyJWT(monster);

        /**
         * Checks if the user is a demo user and sets the user information in
         * the request object.
         *
         * @param {string} userId - The ID of the user from MongoDB.
         * @param {string} role - The role of the user.
         * @param {Object} req - The request object.
         * @param {Object} res - The response object.
         * @param {Function} next - The next middleware function.
         *
         * @throws {UnauthenticatedError} If the JWT is invalid.
         *
         * WARNING!!! As the demo user's ID is hardcoded in the check, the userId
         * for demo user must be updated when purging the users database in MongoDB,
         * or the demo user will get full access to CRUD functionalities for the
         * `MyJobs` page.
         */
        const demoUser = userId === '66cf09db1dbf4d46fad1c1bf';  // MongoDB ID for the demo user
        req.user = { userId, role, demoUser };
        next();
    } catch (error) {
        throw new UnauthenticatedError('authentication JWT is invalid');
    }
};


// Application Stats -> authorize users based on their role (Only Super Admins can access)
export const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        // console.log(roles);  // ['super']
        if (!roles.includes(req.user.role)) {
            throw new UnauthorizedError('Unauthorized to access this route');
        }
        next();
    };
};