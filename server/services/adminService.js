import User from '../models/User.js';
import Doctor from '../models/Doctor.js';
import Appointment from '../models/Appointment.js';
import AppError from '../utils/AppError.js';

export const getDashboardStats = async () => {
  const [totalUsers, totalDoctors, totalPatients, totalAppointments, pendingDoctors] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ role: 'doctor' }),
    User.countDocuments({ role: 'patient' }),
    Appointment.countDocuments(),
    Doctor.countDocuments({ approvalStatus: 'pending' }),
  ]);

  const appointmentsByStatus = await Appointment.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  const recentAppointments = await Appointment.find()
    .populate('patient', 'fullName')
    .populate('doctor', 'name specialization')
    .sort({ createdAt: -1 })
    .limit(5);

  return {
    totalUsers,
    totalDoctors,
    totalPatients,
    totalAppointments,
    pendingDoctors,
    appointmentsByStatus,
    recentAppointments,
  };
};

export const getAllDoctors = async (status, page = 1, limit = 10) => {
  const query = {};
  if (status) query.approvalStatus = status;

  const skip = (page - 1) * limit;
  const [doctors, total] = await Promise.all([
    Doctor.find(query).populate('user', 'fullName email phoneNumber isActive').skip(skip).limit(limit).sort({ createdAt: -1 }),
    Doctor.countDocuments(query),
  ]);

  return { doctors, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
};

export const updateDoctorApproval = async (doctorId, status) => {
  const doctor = await Doctor.findById(doctorId);
  if (!doctor) throw new AppError('Doctor not found', 404);

  doctor.approvalStatus = status;
  await doctor.save();
  return doctor;
};

export const getAllUsers = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const [users, total] = await Promise.all([
    User.find().select('-password').skip(skip).limit(limit).sort({ createdAt: -1 }),
    User.countDocuments(),
  ]);
  return { users, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
};

export const deleteUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError('User not found', 404);
  if (user.role === 'admin') throw new AppError('Cannot delete admin user', 403);

  if (user.role === 'doctor') {
    await Doctor.deleteOne({ user: userId });
  }

  await user.deleteOne();
  return { message: 'User deleted successfully' };
};

export const getAllAppointments = async (page = 1, limit = 10, status) => {
  const query = {};
  if (status) query.status = status;

  const skip = (page - 1) * limit;
  const [appointments, total] = await Promise.all([
    Appointment.find(query)
      .populate('patient', 'fullName email phoneNumber')
      .populate('doctor', 'name specialization')
      .skip(skip)
      .limit(limit)
      .sort({ date: -1 }),
    Appointment.countDocuments(query),
  ]);

  return { appointments, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
};

export const adminDeleteAppointment = async (appointmentId) => {
  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) throw new AppError('Appointment not found', 404);
  await appointment.deleteOne();
  return { message: 'Appointment deleted successfully' };
};

export const createAdminUser = async () => {
  const adminExists = await User.findOne({ role: 'admin' });
  if (adminExists) return null;

  return User.create({
    fullName: 'System Admin',
    email: 'admin@bookadoctor.com',
    password: 'admin123',
    phoneNumber: '0000000000',
    role: 'admin',
  });
};
