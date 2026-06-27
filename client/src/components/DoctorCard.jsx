import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/helpers';

const DoctorCard = ({ doctor }) => (
  <div className="card doctor-card h-100">
    <img
      src={getImageUrl(doctor.profileImage)}
      className="card-img-top"
      alt={doctor.name}
      onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200?text=Doctor'; }}
    />
    <div className="card-body">
      <h5 className="card-title text-primary">{doctor.name}</h5>
      <p className="text-muted mb-1">{doctor.specialization}</p>
      <p className="small mb-2">
        <span className="badge bg-light text-dark me-1">{doctor.experience} yrs exp</span>
        <span className="badge bg-primary">${doctor.consultationFees}</span>
      </p>
      <p className="card-text small text-truncate">{doctor.aboutDoctor || 'Experienced healthcare professional.'}</p>
    </div>
    <div className="card-footer bg-transparent border-0 pb-3">
      <Link to={`/doctors/${doctor._id}`} className="btn btn-primary w-100">View Profile</Link>
    </div>
  </div>
);

export default DoctorCard;
