import {Router} from "express";

// ES6 modules
const router = Router();

// Controller imports
import {
    getMyJobs,
    getJobById,
    createNewJob,
    updateJobById,
    deleteJobById,
} from '../controllers/jobController.js';


router
    .route('/')
    .get(getMyJobs)
    .post(createNewJob);

router
    .route('/:id')
    .get(getJobById)
    .patch(updateJobById)
    .delete(deleteJobById);


export default router;