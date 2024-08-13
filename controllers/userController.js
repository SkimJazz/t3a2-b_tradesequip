// External imports
import { StatusCodes } from 'http-status-codes';


// Local imports
import User from '../models/UserModel.js';
// import Job from '../models/JobModel.js';


export const getCurrentUser = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId });
    const userWithoutPassword = user.toJSON();
    res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};


// ----------------------- Application Data ------------------------------- //

// UNDECIDED if this route will be used in the application. However, if implemented
// it will be an ADMIN ONLY route that will return the numbers of all Users, Jobs,
// Clients in the application, but does not return any sensitive information such
// as passwords create by the user, nor any client information and job data.


// ----------------------- Application Data ------------------------------- //



export const updateUserProfile = async (req, res) => {
    // console.log(req.file);

    // TEMP: Remove password from the request body => No validation for password yet
    const updateUser = {...req.body};
    delete updateUser.password;
    // console.log(updateUser);

    const updatedProfile = await User.findByIdAndUpdate(req.user.userId, updateUser);
    res.status(StatusCodes.OK).json({ msg: 'User Updated' });
};