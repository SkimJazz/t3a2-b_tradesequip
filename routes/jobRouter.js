// External imports
import {Router} from "express";
import { validateJobInput, validateJobIdParam } from '../middleware/handlesValidationLayer.js';

// ES6 modules
const router = Router();

// Controller and middleware imports
import {
    getMyJobs,
    getJobById,
    createNewJob,
    updateJobById,
    deleteJobById,
} from '../controllers/jobController.js';
import {checkForDemoUser} from "../middleware/handlesAuthMiddleware.js";


// ----------------------------- Job routes ---------------------------- //

router
    .route('/')
    .get(getMyJobs)
    .post(checkForDemoUser, validateJobInput, createNewJob);

router
    .route('/:id')
    .get(validateJobIdParam, getJobById)
    .patch(checkForDemoUser, validateJobInput, validateJobIdParam, updateJobById)
    .delete(checkForDemoUser, validateJobIdParam, deleteJobById);


export default router;