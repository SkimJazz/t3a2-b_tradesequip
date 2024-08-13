
// Library imports
import { StatusCodes } from 'http-status-codes';


// Local imports
import Job from '../models/JobModel.js';



// GET ALL MY JOBS IN LIST
export const getMyJobs = async (req, res) => {
    // console.log(req.user);
    const myJobs = await Job.find({ createdBy: req.user.userId });
    res.status(StatusCodes.OK).json({ myJobs });
};


// GET JOB BY ID
export const getJobById = async (req, res) => {
    // const { id } = req.params; // Destructure id from req.params object
    const job = await Job.findById(req.params.id);
    res.status(StatusCodes.OK).json({ job });
};



// CREATE NEW JOB
export const createNewJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
};


// UPDATE JOB BY ID
export const updateJobById = async (req, res) => {
    // const { id } = req.params; // Destructure id from req.params object
    const updateJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.status(StatusCodes.OK).json({ msg: 'job modified', job: updateJob });
};


// DELETE JOB BY ID
export const deleteJobById = async (req, res) => {
    // const { id } = req.params; // Destructure id from req.params object
    const removeJob = await Job.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json({ msg: 'job deleted', job: removeJob });
};