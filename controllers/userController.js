// External imports
import { StatusCodes } from 'http-status-codes';
import cloudinary from 'cloudinary';
import { promises as fs } from 'fs';    // File system module -> promises option


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


// ----------------------------------------------------------------------- //


// UPDATE CURRENT USERS PROFILE
export const updateUserProfile = async (req, res) => {
    // console.log(req.file);
    const updateUser = {...req.body};
    delete updateUser.password;
    // console.log(updateUser);

    // Check BUT only if user is sending image file. Not when changing other fields
    if (req.file) {
        // Cloudinary version 2(v2) Node.js SDK being used -> last update April 22nd 2024
        const response = await cloudinary.v2.uploader.upload(req.file.path);
        // Delete image from local file system after uploading to Cloudinary
        await fs.unlink(req.file.path);

        // Add image to updateUser object
        updateUser.avatar = response.secure_url;
        // Add image public id to updateUser object
        updateUser.avatarPublicId = response.public_id;
    }

    // Return the old instance of the document before the update
    const updatedProfile = await User.findByIdAndUpdate(req.user.userId, updateUser);
    // If user is updating their profile image, check and delete the old image from Cloudinary
    if (req.file && updatedProfile.avatarPublicId) {
        await cloudinary.v2.uploader.destroy(updatedProfile.avatarPublicId);
    }
    res.status(StatusCodes.OK).json({ msg: 'User Updated' });
};