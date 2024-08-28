// External imports
import { Router } from 'express';
import { validateClientInput, validateClientIdParam } from "../middleware/handlesValidationLayer.js";

// ES6 modules
const router = Router();

// Client controller and middleware imports
import {
    getMyClients,
    getClientById,
    createNewClient,
    updateClientById,
    deleteClientById,
} from '../controllers/clientController.js';
import {checkForDemoUser} from "../middleware/handlesAuthMiddleware.js";


/**
 * TODO: Add checkForDemoUser middleware to the routes that require it.
 * Same as the jobRouter.js file.
 * Remember to import `checkForDemoUser` from the handlesAuthMiddleware.js file.
 *
 *   `import {checkForDemoUser} from "../middleware/handlesAuthMiddleware.js";`
 *
 */

// ----------------------------- Client routes ---------------------------- //

router
    .route('/')
    .get(getMyClients)
    .post(checkForDemoUser, validateClientInput , createNewClient);

router
    .route('/:id')
    .get(validateClientIdParam, getClientById)
    .patch(checkForDemoUser, validateClientInput , validateClientIdParam, updateClientById)
    .delete(checkForDemoUser, validateClientIdParam, deleteClientById);


export default router;