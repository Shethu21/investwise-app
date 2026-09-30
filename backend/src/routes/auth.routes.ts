import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';

const router = Router();

router.post('/login-otp', AuthController.loginOtp);

export default router;
