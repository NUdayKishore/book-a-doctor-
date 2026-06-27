import asyncHandler from '../utils/asyncHandler.js';
import * as authService from '../services/authService.js';

export const register = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body);
  res.status(201).json({ success: true, ...result });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.loginUser(email, password);
  res.json({ success: true, ...result });
});

export const getProfile = asyncHandler(async (req, res) => {
  const user = await authService.getUserProfile(req.user._id);
  res.json({ success: true, user });
});

export const logout = asyncHandler(async (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});
