import { Router } from 'express';
import { AdvisorController } from '../controllers/advisor.controller.js';

const router = Router();

router.post('/submit', AdvisorController.submit);
router.post('/verify-otp', AdvisorController.verifyOtp);
router.post('/resend-otp', AdvisorController.resendOtp);
router.post('/send-report', AdvisorController.sendReportMail);

export default router;
