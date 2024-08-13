// External imports
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';

// Local imports
import User from '../models/UserModel.js';
import { hashPassword, comparePassword } from '../utils/passwordUtils.js';
import {UnauthenticatedError} from "../errors/customErrors.js";
import {createJWT, verifyJWT} from '../utils/tokenUtils.js';


export const signup = async (req, res) => {

    const isFirstAccount = (await User.countDocuments()) === 0;
    req.body.role = isFirstAccount ? 'admin' : 'user';

    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;

    const user = await User.create(req.body);
    // res.status(StatusCodes.CREATED).json({ user }); // return user object(everything) with the password
    res.status(StatusCodes.CREATED).json({ msg: 'User created'});
};


export const login = async (req, res) => {

    // Check if the user exists in the database
    const user = await User.findOne({ email: req.body.email });
    // If the user does not exist, throw new UnauthenticatedError from customErrors.js
    if (!user) throw new UnauthenticatedError('invalid credentials');

    const isPasswordMatch = await comparePassword(
        // request located in the JSON body, and were looking for the password
        req.body.password,
        user.password
    );
    if (!isPasswordMatch) throw new UnauthenticatedError('invalid credentials');

    const token = createJWT({ userId: user._id, role: user.role });
    // console.log(token);

    // Ref .env file for JWT_EXPIRES_IN value (1d)
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie('monster', token, {
        httpOnly: true, // Cannot access the cookie using JavaScript
        expires: new Date(Date.now() + oneDay),

        // For https, if in production env then the secure property is set to true
        // if not then can still access it using the http protocol
        secure: process.env.NODE_ENV === 'production',
    });

    // res.send('login route');
    res.status(StatusCodes.OK).json({ msg: `Welcome ${user.name}!` });
    // res.json({ token });
};





export const logout = async (req, res) => {
    const { monster } = req.cookies;
    if (!monster) {
        res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'No user currently logged in' });
        return;
    }
    const { userId } = verifyJWT(monster);
    const user = await User.findById(userId);

    res.cookie('monster', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
        // secure: process.env.NODE_ENV === 'production',
    });
    res.status(StatusCodes.OK).json({ msg: `You are now logged out ${user.name}` });
}