import { Router } from 'express';
import {signup, login, logout} from '../controllers/authController.js';


import { validateSignupInput, validateLoginInput } from '../middleware/handlesValidationLayer.js';



const router = Router();

router.post('/signup', validateSignupInput, signup);
router.post('/login', validateLoginInput, login);
router.get('/logout', logout);


export default router;