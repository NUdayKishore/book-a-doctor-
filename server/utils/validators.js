import { body } from 'express-validator';

export const registerValidation = [
  body('fullName').trim().notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phoneNumber').trim().notEmpty().withMessage('Phone number is required'),
];

export const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const appointmentValidation = [
  body('doctorId').notEmpty().withMessage('Doctor is required'),
  body('date').notEmpty().withMessage('Date is required'),
  body('timeSlot').notEmpty().withMessage('Time slot is required'),
];

export const statusValidation = [
  body('status').isIn(['Pending', 'Confirmed', 'Completed', 'Cancelled']).withMessage('Invalid status'),
];
