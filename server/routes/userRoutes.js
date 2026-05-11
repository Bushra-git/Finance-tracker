import express from 'express';
import { getProfile, sendOTPForChangePassword, changePassword } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/profile', getProfile);
router.post('/send-otp', sendOTPForChangePassword);
router.patch('/change-password', changePassword);

export default router;
