import express from 'express';
import {
  uploadReport,
  getReportsByAppointment,
  getMyReports,
  deleteReport,
} from '../controllers/reportController.js';
import { protect } from '../middleware/auth.js';
import { uploadReport as uploadMiddleware } from '../middleware/upload.js';

const router = express.Router();

router.use(protect);

router.get('/my', getMyReports);
router.post('/:appointmentId', uploadMiddleware.single('report'), uploadReport);
router.get('/appointment/:appointmentId', getReportsByAppointment);
router.delete('/:id', deleteReport);

export default router;
