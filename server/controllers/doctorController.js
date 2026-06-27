import asyncHandler from '../utils/asyncHandler.js';
import * as doctorService from '../services/doctorService.js';

export const getDoctors = asyncHandler(async (req, res) => {
  const { search, specialization, minExperience, maxFees, availableDay, page, limit } = req.query;
  const result = await doctorService.getDoctors(
    { search, specialization, minExperience, maxFees, availableDay },
    Number(page) || 1,
    Number(limit) || 10
  );
  res.json({ success: true, ...result });
});

export const getDoctorById = asyncHandler(async (req, res) => {
  const doctor = await doctorService.getDoctorById(req.params.id);
  res.json({ success: true, doctor });
});

export const getMyProfile = asyncHandler(async (req, res) => {
  const doctor = await doctorService.getDoctorByUserId(req.user._id);
  res.json({ success: true, doctor });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const profileImage = req.file?.filename;
  const doctor = await doctorService.updateDoctorProfile(req.user._id, req.body, profileImage);
  res.json({ success: true, doctor });
});

export const getMyAppointments = asyncHandler(async (req, res) => {
  const appointments = await doctorService.getDoctorAppointments(req.user._id, req.query.status);
  res.json({ success: true, appointments });
});

export const getMyStats = asyncHandler(async (req, res) => {
  const stats = await doctorService.getDoctorStats(req.user._id);
  res.json({ success: true, stats });
});

export const getSpecializations = asyncHandler(async (req, res) => {
  const specializations = [
    'General Physician', 'Cardiologist', 'Dermatologist', 'Pediatrician',
    'Orthopedic', 'Neurologist', 'Gynecologist', 'Psychiatrist',
    'ENT Specialist', 'Ophthalmologist', 'Dentist', 'Urologist',
  ];
  res.json({ success: true, specializations });
});
