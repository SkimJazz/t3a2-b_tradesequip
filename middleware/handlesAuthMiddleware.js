// Local imports
import { UnauthenticatedError } from '../errors/customErrors.js';
import {verifyJWT} from "../utils/tokenUtils.js";



// async removed form this function -> added to the verifyJWT function
export const authenticateUser = (req, res, next) => {
    const { monster } = req.cookies;
    if (!monster) {
        throw new UnauthenticatedError('authentication invalid');
    }

    try {
        const { userId, role } = verifyJWT(monster);
        // const testUser = userId === '6673902fd8c5cf231e36d134'; , testUser
        req.user = { userId, role };
        next();
    } catch (error) {
        throw new UnauthenticatedError('authentication JWT is invalid');
    }
};
