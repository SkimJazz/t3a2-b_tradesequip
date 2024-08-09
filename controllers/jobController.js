import Job from '../models/JobModel.js';


// GET ALL MY JOBS IN LIST
export const getMyJobs = async (req, res) => {
    const myJobs = await Job.find({});
    res.status(200).json({ myJobs });
};


// GET JOB BY ID
export const getJobById = async (req, res) => {
    const { id } = req.params;
    const job = await Job.findById(id);
    console.log(job);
    if (!job) {
        return res.status(404).json({ msg: `no job with id ${id}` });
    }
    res.status(200).json({ job });
};


// CREATE NEW JOB
export const createNewJob = async (req, res) => {
    const { clientName, jobTitle } = req.body;
    const job = await Job.create({ clientName, jobTitle });
    res.status(201).json({ job });
};


// UPDATE JOB BY ID
export const updateJobById = async (req, res) => {
    const { id } = req.params;
    const updateJob = await Job.findByIdAndUpdate(id, req.body, {
        new: true,
    });
    if (!updateJob) {
        return res.status(404).json({ msg: `no job with id ${id}` });
    }
    res.status(200).json({ msg: 'job modified', job: updateJob });
};


// DELETE JOB BY ID
export const deleteJobById = async (req, res) => {
    const { id } = req.params;
    const removeJob = await Job.findByIdAndDelete(id);
    if (!removeJob) {
        return res.status(404).json({ msg: `no job with id ${id}` });
    }
    res.status(200).json({ msg: 'job deleted', job: removeJob });
};