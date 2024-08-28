// External imports
// import { nanoid } from 'nanoid';
import { StatusCodes } from 'http-status-codes';

// Local imports
import Client from '../models/ClientModel.js';



// WARNING: clientName in this file may have conflicts with the clientName
// in the jobController.js file. This is because the clientName is a common
// field in both the client and job objects.

// When the User creates a Job and assigns a Client to the job, the clientName
// field will be destructured from the client object.
// The createNewClient function can be included in the JobController.js file
// to avoid conflicts. This will allow the clientName field to be destructured
// from the client object in the jobController.js file. So when the User creates
// new job, and assigns a client, the clientName will be assigned an id, that
// can be accessed in the My Clients page.


// GET ALL MY CLIENTS
export const getMyClients = async (req, res) => {
    // console.log(req);
    const myClients = await Client.find({ createdBy: req.user.userId });
    res.status(StatusCodes.OK).json({ myClients });
};


// GET CLIENT BY ID
export const getClientById = async (req, res) => {
    const { id } = req.params;  // Destructure id from req.params object
    const client = await Client.findById(id);
    res.status(StatusCodes.OK).json({ client });
};


// CREATE NEW CLIENT -> THIS WILL BE INTEGRATED INTO THE JOB CONTROLLER
export const createNewClient = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const client = await Client.create(req.body);
    res.status(StatusCodes.CREATED).json({ client });
};


// UPDATE CLIENT BY ID
export const updateClientById= async (req, res) => {
    const { id } = req.params;  // Destructure id from req.params object
    const updateClient = await Client.findByIdAndUpdate(id, req.body, {
        new: true,
    });
    res.status(StatusCodes.OK).json({ msg: 'client details have been modified' , client: updateClient });
};


// DELETE CLIENT BY ID
export const deleteClientById = async (req, res) => {
    const { id } = req.params;  // Destructure id from req.params object
    const removeClient = await Client.findByIdAndDelete(id);
    res.status(StatusCodes.OK).json({ msg: 'client deleted', client: removeClient });
};