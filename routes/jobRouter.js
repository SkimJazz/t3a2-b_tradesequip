// External imports and package dependencies
import {Router} from "express";

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
import {
    validateJobInput,
    validateIdParam,
} from '../middleware/handlesValidationLayer.js';


router
    .route('/')
    .get(getMyJobs)
    .post(validateJobInput, createNewJob);

router
    .route('/:id')
    .get(validateIdParam, getJobById)
    .patch(validateJobInput, validateIdParam, updateJobById)
    .delete(validateIdParam, deleteJobById);


export default router;