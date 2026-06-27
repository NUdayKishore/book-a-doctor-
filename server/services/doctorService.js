import Doctor from '../models/Doctor.js';
import Appointment from '../models/Appointment.js';
import AppError from '../utils/AppError.js';

export const getDoctors = async (filters = {}, page = 1, limit = 10) => {
  const query = { approvalStatus: 'approved' };

  if (filters.search) {
    query.$or = [
      { name: { $regex: filters.search, $options: 'i' } },
      { specialization: { $regex: filters.search, $options: 'i' } },
    ];
  }
  if (filters.specialization) {
    query.specialization = { $regex: filters.specialization, $options: 'i' };
  }
  if (filters.minExperience) {
    query.experience = { $gte: Number(filters.minExperience) };
  }
  if (filters.maxFees) {
    query.consultationFees = { $lte: Number(filters.maxFees) };
  }
  if (filters.availableDay) {
    query.availableDays = filters.availableDay;
  }

  const skip = (page - 1) * limit;
  const [doctors, total] = await Promise.all([
    Doctor.find(query).populate('user', 'fullName email phoneNumber').skip(skip).limit(limit).sort({ createdAt: -1 }),
    Doctor.countDocuments(query),
  ]);

  return {
    doctors,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

export const getDoctorById = async (doctorId) => {
  const doctor = await Doctor.findById(doctorId).populate('user', 'fullName email phoneNumber');
  if (!doctor) throw new AppError('Doctor not found', 404);
  return doctor;
};

export const getDoctorByUserId = async (userId) => {
  const doctor = await Doctor.findOne({ user: userId }).populate('user', 'fullName email phoneNumber');
  if (!doctor) throw new AppError('Doctor profile not found', 404);
  return doctor;
};

export const updateDoctorProfile = async (userId, updateData, profileImage) => {
  const doctor = await Doctor.findOne({ user: userId });
  if (!doctor) throw new AppError('Doctor profile not found', 404);

  const allowedFields = [
    'name', 'specialization', 'qualification', 'experience',
    'consultationFees', 'aboutDoctor', 'availableDays', 'availableTimeSlots',
  ];

  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      if (field === 'availableDays' || field === 'availableTimeSlots') {
        doctor[field] = typeof updateData[field] === 'string'
          ? JSON.parse(updateData[field])
          : updateData[field];
      } else {
        doctor[field] = updateData[field];
      }
    }
  });

  if (profileImage) {
    doctor.profileImage = `/uploads/${profileImage}`;
  }

  await doctor.save();
  return doctor;
};

export const getDoctorAppointments = async (userId, status) => {
  const doctor = await Doctor.findOne({ user: userId });
  if (!doctor) throw new AppError('Doctor profile not found', 404);

  const query = { doctor: doctor._id };
  if (status) query.status = status;

  return Appointment.find(query)
    .populate('patient', 'fullName email phoneNumber')
    .sort({ date: -1 });
};

export const getDoctorStats = async (userId) => {
  const doctor = await Doctor.findOne({ user: userId });
  if (!doctor) throw new AppError('Doctor profile not found', 404);

  const [total, pending, confirmed, completed, cancelled] = await Promise.all([
    Appointment.countDocuments({ doctor: doctor._id }),
    Appointment.countDocuments({ doctor: doctor._id, status: 'Pending' }),
    Appointment.countDocuments({ doctor: doctor._id, status: 'Confirmed' }),
    Appointment.countDocuments({ doctor: doctor._id, status: 'Completed' }),
    Appointment.countDocuments({ doctor: doctor._id, status: 'Cancelled' }),
  ]);

  return { total, pending, confirmed, completed, cancelled };
};
