import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    date: {
      type: Date,
      required: [true, 'Appointment date is required'],
    },
    timeSlot: {
      type: String,
      required: [true, 'Time slot is required'],
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

// Prevent duplicate bookings for same doctor, date, and time slot
appointmentSchema.index({ doctor: 1, date: 1, timeSlot: 1 }, { unique: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
