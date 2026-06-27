import asyncHandler from '../utils/asyncHandler.js';
import * as appointmentService from '../services/appointmentService.js';

export const createAppointment = asyncHandler(async (req, res) => {
  const appointment = await appointmentService.createAppointment(req.user._id, req.body);

  // Emit real-time update via Socket.io
  const io = req.app.get('io');
  if (io) {
    io.emit('appointment:created', appointment);
    io.to(`doctor:${appointment.doctor._id}`).emit('appointment:new', appointment);
    io.to(`patient:${req.user._id}`).emit('appointment:update', appointment);
  }

  res.status(201).json({ success: true, appointment });
});

export const getMyAppointments = asyncHandler(async (req, res) => {
  const appointments = await appointmentService.getPatientAppointments(req.user._id, req.query.status);
  res.json({ success: true, appointments });
});

export const getAppointmentById = asyncHandler(async (req, res) => {
  const appointment = await appointmentService.getAppointmentById(req.params.id);
  res.json({ success: true, appointment });
});

export const updateStatus = asyncHandler(async (req, res) => {
  const appointment = await appointmentService.updateAppointmentStatus(
    req.params.id,
    req.body.status,
    req.user._id,
    req.user.role
  );

  const io = req.app.get('io');
  if (io) {
    io.emit('appointment:statusUpdated', appointment);
    io.to(`patient:${appointment.patient._id}`).emit('appointment:update', appointment);
    io.to(`doctor:${appointment.doctor._id}`).emit('appointment:update', appointment);
  }

  res.json({ success: true, appointment });
});

export const rescheduleAppointment = asyncHandler(async (req, res) => {
  const appointment = await appointmentService.rescheduleAppointment(
    req.params.id,
    req.user._id,
    req.body
  );

  const io = req.app.get('io');
  if (io) {
    io.emit('appointment:rescheduled', appointment);
  }

  res.json({ success: true, appointment });
});

export const deleteAppointment = asyncHandler(async (req, res) => {
  const result = await appointmentService.deleteAppointment(
    req.params.id,
    req.user._id,
    req.user.role
  );

  const io = req.app.get('io');
  if (io) {
    io.emit('appointment:deleted', { id: req.params.id });
  }

  res.json({ success: true, ...result });
});
