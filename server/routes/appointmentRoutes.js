import express from 'express';
import {
  createAppointment,
  getMyAppointments,
  getAppointmentById,
  updateStatus,
  rescheduleAppointment,
  deleteAppointment,
} from '../controllers/appointmentController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { appointmentValidation, statusValidation } from '../utils/validators.js';

const router = express.Router();

router.use(protect);

router.post('/', authorize('patient'), appointmentValidation, validate, createAppointment);
router.get('/my', getMyAppointments);
router.get('/:id', getAppointmentById);
router.patch('/:id/status', statusValidation, validate, updateStatus);
router.patch('/:id/reschedule', authorize('patient'), rescheduleAppointment);
router.delete('/:id', deleteAppointment);

export default router;
