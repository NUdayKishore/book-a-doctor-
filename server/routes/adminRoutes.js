import express from 'express';
import {
  getDashboardStats,
  getAllDoctors,
  updateDoctorApproval,
  getAllUsers,
  deleteUser,
  getAllAppointments,
  deleteAppointment,
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect, authorize('admin'));

router.get('/stats', getDashboardStats);
router.get('/doctors', getAllDoctors);
router.patch('/doctors/:id/approval', updateDoctorApproval);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.get('/appointments', getAllAppointments);
router.delete('/appointments/:id', deleteAppointment);

export default router;
