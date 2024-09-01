// External imports
// import { nanoid } from 'nanoid';
import { StatusCodes } from 'http-status-codes';

// Local imports
import Client from '../models/ClientModel.js';



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