import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { doctorAPI } from '../api';
import { useAuth } from '../context/AuthContext';
import { getImageUrl, formatDate } from '../utils/helpers';

const DoctorDetails = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    doctorAPI.getById(id)
      .then((res) => setDoctor(res.data.doctor))
      .catch(() => toast.error('Doctor not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBook = () => {
    if (!user) {
      toast.info('Please login to book an appointment');
      navigate('/login', { state: { from: { pathname: `/doctors/${id}/book` } } });
      return;
    }
    if (user.role !== 'patient') {
      toast.error('Only patients can book appointments');
      return;
    }
    navigate(`/doctors/${id}/book`);
  };

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="container py-5 text-center">
        <h3>Doctor not found</h3>
        <Link to="/doctors" className="btn btn-primary mt-3">Back to Doctors</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card border-0 shadow-sm p-4">
        <div className="row g-4">
          <div className="col-md-4 text-center">
            <img src={getImageUrl(doctor.profileImage)} alt={doctor.name} className="doctor-avatar mb-3"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/120?text=Dr'; }} />
            <h3 className="text-primary">{doctor.name}</h3>
            <p className="text-muted">{doctor.specialization}</p>
            <span className="badge bg-primary fs-6">${doctor.consultationFees}</span>
          </div>
          <div className="col-md-8">
            <h5 className="text-primary">About</h5>
            <p>{doctor.aboutDoctor || 'Experienced healthcare professional dedicated to patient care.'}</p>

            <div className="row g-3 mt-2">
              <div className="col-sm-6">
                <strong>Qualification:</strong> {doctor.qualification}
              </div>
              <div className="col-sm-6">
                <strong>Experience:</strong> {doctor.experience} years
              </div>
              <div className="col-sm-6">
                <strong>Email:</strong> {doctor.email}
              </div>
              <div className="col-sm-6">
                <strong>Phone:</strong> {doctor.user?.phoneNumber || 'N/A'}
              </div>
            </div>

            <h5 className="text-primary mt-4">Available Days</h5>
            <div className="d-flex flex-wrap gap-2">
              {doctor.availableDays?.map((day) => (
                <span key={day} className="badge bg-light text-dark">{day}</span>
              ))}
            </div>

            <h5 className="text-primary mt-4">Time Slots</h5>
            <div className="d-flex flex-wrap gap-2">
              {doctor.availableTimeSlots?.map((slot, i) => (
                <span key={i} className="badge bg-primary">{slot.start} - {slot.end}</span>
              ))}
            </div>

            <button className="btn btn-primary btn-lg mt-4" onClick={handleBook}>
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
