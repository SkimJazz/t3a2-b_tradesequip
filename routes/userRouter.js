// External imports
import { Router } from 'express';

// Local imports
import { getCurrentUser, updateUserProfile, getApplicationStats } from '../controllers/userController.js';
import { validateUpdateUserInput } from '../middleware/handlesValidationLayer.js';
import {authorizePermissions, checkForDemoUser} from "../middleware/handlesAuthMiddleware.js";
import upload from '../middleware/handlesMulterMiddleware.js';



// Public route for getting the current user
const router = Router();

router.get('/current-user',
    getCurrentUser
);


// Application stats for Super dashboard
router.get('/super/app-stats', [
    authorizePermissions('super'),
    getApplicationStats ]);


// Update user profile
router.patch('/update-user',
    checkForDemoUser,
    upload.single('avatar'),
    validateUpdateUserInput,
    updateUserProfile
);


export default router;