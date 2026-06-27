import express from 'express';
import { register, login, getProfile, logout } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { registerValidation, loginValidation } from '../utils/validators.js';

const router = express.Router();

router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.get('/profile', protect, getProfile);
router.post('/logout', protect, logout);

export default router;
