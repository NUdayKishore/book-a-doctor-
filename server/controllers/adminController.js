import asyncHandler from '../utils/asyncHandler.js';
import * as adminService from '../services/adminService.js';

export const getDashboardStats = asyncHandler(async (req, res) => {
  const stats = await adminService.getDashboardStats();
  res.json({ success: true, stats });
});

export const getAllDoctors = asyncHandler(async (req, res) => {
  const { status, page, limit } = req.query;
  const result = await adminService.getAllDoctors(status, Number(page) || 1, Number(limit) || 10);
  res.json({ success: true, ...result });
});

export const updateDoctorApproval = asyncHandler(async (req, res) => {
  const doctor = await adminService.updateDoctorApproval(req.params.id, req.body.status);
  res.json({ success: true, doctor });
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const result = await adminService.getAllUsers(Number(req.query.page) || 1, Number(req.query.limit) || 10);
  res.json({ success: true, ...result });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const result = await adminService.deleteUser(req.params.id);
  res.json({ success: true, ...result });
});

export const getAllAppointments = asyncHandler(async (req, res) => {
  const { page, limit, status } = req.query;
  const result = await adminService.getAllAppointments(
    Number(page) || 1,
    Number(limit) || 10,
    status
  );
  res.json({ success: true, ...result });
});

export const deleteAppointment = asyncHandler(async (req, res) => {
  const result = await adminService.adminDeleteAppointment(req.params.id);
  res.json({ success: true, ...result });
});
