import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { doctorAPI, appointmentAPI } from '../api';

const BookAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [form, setForm] = useState({ date: '', timeSlot: '', notes: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    doctorAPI.getById(id).then((res) => setDoctor(res.data.doctor)).catch(() => {
      toast.error('Doctor not found');
      navigate('/doctors');
    });
  }, [id, navigate]);

  const timeSlots = doctor?.availableTimeSlots?.map((s) => `${s.start} - ${s.end}`) || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.date || !form.timeSlot) {
      toast.error('Please select date and time slot');
      return;
    }
    setLoading(true);
    try {
      await appointmentAPI.create({
        doctorId: id,
        date: form.date,
        timeSlot: form.timeSlot,
        notes: form.notes,
      });
      toast.success('Appointment booked successfully!');
      navigate('/patient/appointments');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  if (!doctor) {
    return (
      <div className="loading-overlay">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm p-4">
            <h3 className="text-primary mb-1">Book Appointment</h3>
            <p className="text-muted mb-4">with Dr. {doctor.name} — {doctor.specialization}</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Date</label>
                <input type="date" className="form-control" min={minDate} value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Time Slot</label>
                <select className="form-select" value={form.timeSlot}
                  onChange={(e) => setForm({ ...form, timeSlot: e.target.value })} required>
                  <option value="">Select a time slot</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Notes (optional)</label>
                <textarea className="form-control" rows="3" value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Booking...' : 'Confirm Booking'}
                </button>
                <Link to={`/doctors/${id}`} className="btn btn-outline-secondary">Cancel</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
