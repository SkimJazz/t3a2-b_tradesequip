// External imports
import { Router } from 'express';


// Local imports
import { getCurrentUser, updateUserProfile } from '../controllers/userController.js';
import { validateUpdateUserInput } from '../middleware/handlesValidationLayer.js';
import upload from '../middleware/handlesMulterMiddleware.js';


const router = Router();

router.get('/current-user', getCurrentUser);
// Add GET Admin route here
router.patch('/update-user', upload.single('avatar'),validateUpdateUserInput, updateUserProfile);


export default router;