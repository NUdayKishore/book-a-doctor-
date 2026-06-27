import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';
import AppError from '../utils/AppError.js';

export const createAppointment = async (patientId, appointmentData) => {
  const { doctorId, date, timeSlot, notes } = appointmentData;

  const doctor = await Doctor.findById(doctorId);
  if (!doctor) throw new AppError('Doctor not found', 404);
  if (doctor.approvalStatus !== 'approved') {
    throw new AppError('This doctor is not available for booking', 400);
  }

  const appointmentDate = new Date(date);
  const dayName = appointmentDate.toLocaleDateString('en-US', { weekday: 'long' });

  if (!doctor.availableDays.includes(dayName)) {
    throw new AppError(`Doctor is not available on ${dayName}`, 400);
  }

  const slotAvailable = doctor.availableTimeSlots.some(
    (slot) => `${slot.start} - ${slot.end}` === timeSlot || slot.start === timeSlot
  );
  if (!slotAvailable) {
    throw new AppError('Selected time slot is not available', 400);
  }

  const existing = await Appointment.findOne({
    doctor: doctorId,
    date: appointmentDate,
    timeSlot,
    status: { $nin: ['Cancelled'] },
  });
  if (existing) {
    throw new AppError('This time slot is already booked', 400);
  }

  const appointment = await Appointment.create({
    patient: patientId,
    doctor: doctorId,
    date: appointmentDate,
    timeSlot,
    notes: notes || '',
  });

  return appointment.populate([
    { path: 'patient', select: 'fullName email phoneNumber' },
    { path: 'doctor', select: 'name specialization consultationFees' },
  ]);
};

export const getPatientAppointments = async (patientId, status) => {
  const query = { patient: patientId };
  if (status) query.status = status;

  return Appointment.find(query)
    .populate('doctor', 'name specialization consultationFees profileImage')
    .sort({ date: -1 });
};

export const updateAppointmentStatus = async (appointmentId, status, userId, userRole) => {
  const appointment = await Appointment.findById(appointmentId)
    .populate('doctor')
    .populate('patient', 'fullName email');

  if (!appointment) throw new AppError('Appointment not found', 404);

  if (userRole === 'doctor') {
    const doctor = await Doctor.findOne({ user: userId });
    if (!doctor || appointment.doctor._id.toString() !== doctor._id.toString()) {
      throw new AppError('Not authorized to update this appointment', 403);
    }
  } else if (userRole === 'patient') {
    if (appointment.patient._id.toString() !== userId.toString()) {
      throw new AppError('Not authorized to update this appointment', 403);
    }
    if (!['Cancelled'].includes(status)) {
      throw new AppError('Patients can only cancel appointments', 403);
    }
  }

  appointment.status = status;
  await appointment.save();

  return appointment.populate([
    { path: 'patient', select: 'fullName email phoneNumber' },
    { path: 'doctor', select: 'name specialization' },
  ]);
};

export const rescheduleAppointment = async (appointmentId, patientId, { date, timeSlot }) => {
  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) throw new AppError('Appointment not found', 404);
  if (appointment.patient.toString() !== patientId.toString()) {
    throw new AppError('Not authorized', 403);
  }
  if (['Completed', 'Cancelled'].includes(appointment.status)) {
    throw new AppError('Cannot reschedule this appointment', 400);
  }

  const existing = await Appointment.findOne({
    doctor: appointment.doctor,
    date: new Date(date),
    timeSlot,
    status: { $nin: ['Cancelled'] },
    _id: { $ne: appointmentId },
  });
  if (existing) throw new AppError('This time slot is already booked', 400);

  appointment.date = new Date(date);
  appointment.timeSlot = timeSlot;
  appointment.status = 'Pending';
  await appointment.save();

  return appointment.populate([
    { path: 'patient', select: 'fullName email phoneNumber' },
    { path: 'doctor', select: 'name specialization consultationFees' },
  ]);
};

export const deleteAppointment = async (appointmentId, userId, userRole) => {
  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) throw new AppError('Appointment not found', 404);

  if (userRole === 'patient' && appointment.patient.toString() !== userId.toString()) {
    throw new AppError('Not authorized', 403);
  }

  await appointment.deleteOne();
  return { message: 'Appointment deleted successfully' };
};

export const getAppointmentById = async (appointmentId) => {
  const appointment = await Appointment.findById(appointmentId)
    .populate('patient', 'fullName email phoneNumber')
    .populate('doctor', 'name specialization consultationFees profileImage');
  if (!appointment) throw new AppError('Appointment not found', 404);
  return appointment;
};
