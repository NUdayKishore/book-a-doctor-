import express from 'express';
import {
  getDoctors,
  getDoctorById,
  getMyProfile,
  updateProfile,
  getMyAppointments,
  getMyStats,
  getSpecializations,
} from '../controllers/doctorController.js';
import { protect, authorize } from '../middleware/auth.js';
import { uploadProfileImage } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getDoctors);
router.get('/specializations', getSpecializations);
router.get('/profile/me', protect, authorize('doctor'), getMyProfile);
router.put('/profile/me', protect, authorize('doctor'), uploadProfileImage.single('profileImage'), updateProfile);
router.get('/appointments/me', protect, authorize('doctor'), getMyAppointments);
router.get('/stats/me', protect, authorize('doctor'), getMyStats);
router.get('/:id', getDoctorById);

export default router;
