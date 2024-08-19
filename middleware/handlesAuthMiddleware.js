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
    const { monster } = req.cookies;
    if (!monster) {
        throw new UnauthenticatedError('authentication invalid');
    }
    try {
        const { userId, role } = verifyJWT(monster);
        const demoUser = userId === '66c1b6a2b9cfca4245338d63';     // demoUser
        req.user = { userId, role, demoUser };
        next();
    } catch (error) {
        throw new UnauthenticatedError('authentication JWT is invalid');
    }
};


// Application Stats -> authorize users based on their role (Only Admin)
export const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        // console.log(roles);  // ['super']
        if (!roles.includes(req.user.role)) {
            throw new UnauthorizedError('Unauthorized to access this route');
        }
        next();
    };
};