import mongoose from 'mongoose';

const timeSlotSchema = new mongoose.Schema(
  {
    start: { type: String, required: true },
    end: { type: String, required: true },
  },
  { _id: false }
);

const doctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'Doctor name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    specialization: {
      type: String,
      required: [true, 'Specialization is required'],
      trim: true,
    },
    qualification: {
      type: String,
      required: [true, 'Qualification is required'],
      trim: true,
    },
    experience: {
      type: Number,
      required: [true, 'Experience is required'],
      min: 0,
    },
    consultationFees: {
      type: Number,
      required: [true, 'Consultation fees are required'],
      min: 0,
    },
    profileImage: {
      type: String,
      default: '',
    },
    aboutDoctor: {
      type: String,
      default: '',
    },
    availableDays: {
      type: [String],
      default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    },
    availableTimeSlots: {
      type: [timeSlotSchema],
      default: [
        { start: '09:00', end: '10:00' },
        { start: '10:00', end: '11:00' },
        { start: '11:00', end: '12:00' },
        { start: '14:00', end: '15:00' },
        { start: '15:00', end: '16:00' },
        { start: '16:00', end: '17:00' },
      ],
    },
    approvalStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'suspended'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
