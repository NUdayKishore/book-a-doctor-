import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { appointmentAPI } from '../../api';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../components/StatusBadge';
import { formatDate } from '../../utils/helpers';

const PatientDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appointmentAPI.getMy()
      .then((res) => setAppointments(res.data.appointments))
      .catch(() => toast.error('Failed to load appointments'))
      .finally(() => setLoading(false));
  }, []);

  const upcoming = appointments.filter((a) => !['Completed', 'Cancelled'].includes(a.status));
  const completed = appointments.filter((a) => a.status === 'Completed');

  return (
    <div>
      <h2 className="mb-4">Welcome, {user?.fullName}</h2>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card stat-card p-3">
            <h6 className="text-muted">Total Appointments</h6>
            <h2 className="text-primary mb-0">{appointments.length}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card stat-card p-3">
            <h6 className="text-muted">Upcoming</h6>
            <h2 className="text-warning mb-0">{upcoming.length}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card stat-card p-3">
            <h6 className="text-muted">Completed</h6>
            <h2 className="text-success mb-0">{completed.length}</h2>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Recent Appointments</h5>
        <Link to="/doctors" className="btn btn-primary btn-sm">Book New</Link>
      </div>

      {loading ? (
        <div className="text-center py-4"><div className="spinner-border text-primary" /></div>
      ) : appointments.length === 0 ? (
        <div className="card p-4 text-center text-muted">
          No appointments yet. <Link to="/doctors">Find a doctor</Link> to get started.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover bg-white rounded shadow-sm">
            <thead className="table-light">
              <tr>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.slice(0, 5).map((apt) => (
                <tr key={apt._id}>
                  <td>Dr. {apt.doctor?.name}</td>
                  <td>{formatDate(apt.date)}</td>
                  <td>{apt.timeSlot}</td>
                  <td><StatusBadge status={apt.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
