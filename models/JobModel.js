// External imports and package dependencies
import mongoose from 'mongoose';


// Local imports
import {JOB_STATUS, JOB_TYPE } from "../utils/constants.js";


// Prelim schema for the Job model -> More stuff to add later.
const JobSchema = new mongoose.Schema(
    {
        clientName: String,
        jobTitle: String,

        // Create a key as an object with type string and enum predefined values(Dropdown menu)
        jobStatus: {
            type: String,
            enum: Object.values(JOB_STATUS),
            default: JOB_STATUS.PENDING,
        },
        jobType: {
            type: String,
            enum: Object.values(JOB_TYPE),
            default: JOB_TYPE.FORM_WORK,
        },
        jobLocation: {
            type: String,
            default: 'my city',
        },

        // createdBy is tied to the User -> Value is Mongo ObjectId -> Referencing the User
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

export default mongoose.model('Job', JobSchema);