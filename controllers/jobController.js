import { nanoid } from 'nanoid';


// Array of jobs
let myJobs = [
    { id: nanoid(), clientName: 'hutchinson', jobTitle: 'formwork' },
    { id: nanoid(), clientName: 'metricon', jobTitle: 'concreting' },
];


// GET ALL JOBS IN MY LIST
export const getMyJobs = async (req, res) => {
    res.status(200).json({ myJobs });
};


// GET JOB BY ID
export const getJobById = async (req, res) => {
    const { id } = req.params;
    const job = myJobs.find((job) => job.id === id);
    if (!job) {
        // throw new Error('no job with that id');
        return res.status(404).json({ msg: `no job with id ${id}` });
    }
    res.status(200).json({ job });
};


// CREATE NEW JOB
export const createNewJob = async (req, res) => {
    const { clientName, jobTitle } = req.body;
    if (!clientName || !jobTitle) {
        return res.status(400).json({ msg: 'Provide Client Name and Job Title' });
    }
    const id = nanoid(10);
    const job = { id, clientName, jobTitle };
    myJobs.push(job);
    res.status(200).json({ job });
};


// UPDATE JOB BY ID
export const updateJobById = async (req, res) => {
    const { clientName, jobTitle } = req.body;
    if (!clientName || !jobTitle) {
        return res.status(400).json({ msg: 'provide Client Name and Job Title' });
    }
    const { id } = req.params;
    const job = myJobs.find((job) => job.id === id);
    if (!job) {
        return res.status(404).json({ msg: `no job with id ${id}` });
    }
    job.clientName = clientName;
    job.jobTitle = jobTitle;
    res.status(200).json({ msg: 'job modified', job });
};



export const deleteJobById = async (req, res) => {
    const { id } = req.params;
    const job = myJobs.find((job) => job.id === id);
    if (!job) {
        return res.status(404).json({ msg: `no job with id ${id}` });
    }
    const newJobs = myJobs.filter((job) => job.id !== id);
    myJobs = newJobs;

    res.status(200).json({ msg: 'job deleted' });
};