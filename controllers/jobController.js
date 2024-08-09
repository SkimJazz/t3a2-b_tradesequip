
// Library imports
import { StatusCodes } from 'http-status-codes';


// Local imports
import Job from '../models/JobModel.js';
import { NotFoundError } from '../errors/customErrors.js';



// GET ALL MY JOBS IN LIST
export const getMyJobs = async (req, res) => {
    const myJobs = await Job.find({});
    res.status(StatusCodes.OK).json({ myJobs });
};


// GET JOB BY ID
export const getJobById = async (req, res) => {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) throw new NotFoundError(`no job with id ${id}`);
    res.status(StatusCodes.OK).json({ job });
};


// CREATE NEW JOB
export const createNewJob = async (req, res) => {
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
};


// UPDATE JOB BY ID
export const updateJobById = async (req, res) => {
    const { id } = req.params;
    const updateJob = await Job.findByIdAndUpdate(id, req.body, {
        new: true,
    });
    if (!updateJob) throw new NotFoundError(`no job with id ${id}`);
    res.status(StatusCodes.OK).json({ msg: 'job modified', job: updateJob });
};


// DELETE JOB BY ID
export const deleteJobById = async (req, res) => {
    const { id } = req.params;
    const removeJob = await Job.findByIdAndDelete(id);
    if (!removeJob) throw new NotFoundError(`no job with id ${id}`);
    res.status(StatusCodes.OK).json({ msg: 'job deleted', job: removeJob });
};