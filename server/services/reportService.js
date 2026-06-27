import Report from '../models/Report.js';
import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';
import AppError from '../utils/AppError.js';

export const uploadReport = async (patientId, appointmentId, file) => {
  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) throw new AppError('Appointment not found', 404);
  if (appointment.patient.toString() !== patientId.toString()) {
    throw new AppError('Not authorized to upload report for this appointment', 403);
  }

  const report = await Report.create({
    appointment: appointmentId,
    patient: patientId,
    doctor: appointment.doctor,
    fileName: file.filename,
    originalName: file.originalname,
    filePath: `/uploads/${file.filename}`,
    fileType: file.mimetype,
    fileSize: file.size,
  });

  return report.populate([
    { path: 'appointment', select: 'date timeSlot status' },
    { path: 'doctor', select: 'name specialization' },
  ]);
};

export const getReportsByAppointment = async (appointmentId, userId, userRole) => {
  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) throw new AppError('Appointment not found', 404);

  if (userRole === 'patient' && appointment.patient.toString() !== userId.toString()) {
    throw new AppError('Not authorized', 403);
  }

  if (userRole === 'doctor') {
    const doctor = await Doctor.findOne({ user: userId });
    if (!doctor || appointment.doctor.toString() !== doctor._id.toString()) {
      throw new AppError('Not authorized', 403);
    }
  }

  return Report.find({ appointment: appointmentId })
    .populate('patient', 'fullName email')
    .sort({ createdAt: -1 });
};

export const getPatientReports = async (patientId) => {
  return Report.find({ patient: patientId })
    .populate('appointment', 'date timeSlot status')
    .populate('doctor', 'name specialization')
    .sort({ createdAt: -1 });
};

export const getDoctorReports = async (userId) => {
  const doctor = await Doctor.findOne({ user: userId });
  if (!doctor) throw new AppError('Doctor profile not found', 404);

  return Report.find({ doctor: doctor._id })
    .populate('patient', 'fullName email')
    .populate('appointment', 'date timeSlot status')
    .sort({ createdAt: -1 });
};

export const deleteReport = async (reportId, userId) => {
  const report = await Report.findById(reportId);
  if (!report) throw new AppError('Report not found', 404);
  if (report.patient.toString() !== userId.toString()) {
    throw new AppError('Not authorized', 403);
  }
  await report.deleteOne();
  return { message: 'Report deleted successfully' };
};
