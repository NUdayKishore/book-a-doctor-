import asyncHandler from '../utils/asyncHandler.js';
import * as reportService from '../services/reportService.js';

export const uploadReport = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Please upload a file' });
  }
  const report = await reportService.uploadReport(req.user._id, req.params.appointmentId, req.file);
  res.status(201).json({ success: true, report });
});

export const getReportsByAppointment = asyncHandler(async (req, res) => {
  const reports = await reportService.getReportsByAppointment(
    req.params.appointmentId,
    req.user._id,
    req.user.role
  );
  res.json({ success: true, reports });
});

export const getMyReports = asyncHandler(async (req, res) => {
  const reports = req.user.role === 'doctor'
    ? await reportService.getDoctorReports(req.user._id)
    : await reportService.getPatientReports(req.user._id);
  res.json({ success: true, reports });
});

export const deleteReport = asyncHandler(async (req, res) => {
  const result = await reportService.deleteReport(req.params.id, req.user._id);
  res.json({ success: true, ...result });
});
