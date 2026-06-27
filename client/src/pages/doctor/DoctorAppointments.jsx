import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { doctorAPI, appointmentAPI } from '../../api';
import StatusBadge from '../../components/StatusBadge';
import { formatDate } from '../../utils/helpers';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const fetchAppointments = () => {
    doctorAPI.getMyAppointments(filter ? { status: filter } : {})
      .then((res) => setAppointments(res.data.appointments))
      .catch(() => toast.error('Failed to load appointments'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchAppointments(); }, [filter]);

  const updateStatus = async (id, status) => {
    try {
      await appointmentAPI.updateStatus(id, status);
      toast.success(`Appointment ${status.toLowerCase()}`);
      fetchAppointments();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  if (loading) return <div className="text-center py-4"><div className="spinner-border text-primary" /></div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Appointments</h2>
        <select className="form-select w-auto" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All Status</option>
          {['Pending', 'Confirmed', 'Completed', 'Cancelled'].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {appointments.length === 0 ? (
        <div className="card p-4 text-center text-muted">No appointments found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover bg-white rounded shadow-sm">
            <thead className="table-light">
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((apt) => (
                <tr key={apt._id}>
                  <td>{apt.patient?.fullName}<br /><small className="text-muted">{apt.patient?.email}</small></td>
                  <td>{formatDate(apt.date)}</td>
                  <td>{apt.timeSlot}</td>
                  <td><StatusBadge status={apt.status} /></td>
                  <td>
                    {apt.status === 'Pending' && (
                      <button className="btn btn-sm btn-success me-1" onClick={() => updateStatus(apt._id, 'Confirmed')}>Confirm</button>
                    )}
                    {apt.status === 'Confirmed' && (
                      <button className="btn btn-sm btn-primary me-1" onClick={() => updateStatus(apt._id, 'Completed')}>Complete</button>
                    )}
                    {!['Completed', 'Cancelled'].includes(apt.status) && (
                      <button className="btn btn-sm btn-outline-danger" onClick={() => updateStatus(apt._id, 'Cancelled')}>Cancel</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;
