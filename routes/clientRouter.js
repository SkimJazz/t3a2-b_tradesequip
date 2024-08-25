import { Router } from 'express';
const router = Router();

import {
    getMyClients,
    getClientById,
    createNewClient,
    updateClientById,
    deleteClientById,
} from '../controllers/clientController.js';
import { validateClientInput, validateClientIdParam } from "../middleware/handlesValidationLayer.js";


router
    .route('/')
    .get(getMyClients)
    .post(validateClientInput , createNewClient);

router
    .route('/:id')
    .get(validateClientIdParam, getClientById)
    .patch(validateClientInput , validateClientIdParam, updateClientById)
    .delete(validateClientIdParam, deleteClientById);

export default router;