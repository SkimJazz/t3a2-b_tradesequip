// External imports
import { Router } from 'express';


// Local imports
import { getCurrentUser, updateUserProfile} from '../controllers/userController.js';
import { validateUpdateUserInput } from '../middleware/handlesValidationLayer.js';


const router = Router();

router.get('/current-user', getCurrentUser);
// Add GET Admin route here
router.patch('/update-user', validateUpdateUserInput, updateUserProfile);


export default router;