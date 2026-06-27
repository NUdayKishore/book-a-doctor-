import User from '../models/User.js';
import Doctor from '../models/Doctor.js';
import AppError from '../utils/AppError.js';
import generateToken from '../utils/generateToken.js';

export const registerUser = async (userData) => {
  const { fullName, email, password, phoneNumber, role } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('Email already registered', 400);
  }

  const userRole = role === 'doctor' ? 'doctor' : 'patient';

  const user = await User.create({
    fullName,
    email,
    password,
    phoneNumber,
    role: userRole,
  });

  // Create doctor profile if registering as doctor
  if (userRole === 'doctor') {
    await Doctor.create({
      user: user._id,
      name: fullName,
      email,
      specialization: userData.specialization || 'General Physician',
      qualification: userData.qualification || 'MBBS',
      experience: userData.experience || 0,
      consultationFees: userData.consultationFees || 500,
      aboutDoctor: userData.aboutDoctor || '',
      approvalStatus: 'pending',
    });
  }

  const token = generateToken(user._id);

  return {
    user: {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
    },
    token,
  };
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Invalid email or password', 401);
  }

  if (!user.isActive) {
    throw new AppError('Your account has been deactivated', 403);
  }

  const token = generateToken(user._id);

  return {
    user: {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
    },
    token,
  };
};

export const getUserProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError('User not found', 404);
  return user;
};
