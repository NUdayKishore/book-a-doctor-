import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { adminAPI } from '../../api';
import StatusBadge from '../../components/StatusBadge';
import Pagination from '../../components/Pagination';
import { formatDate } from '../../utils/helpers';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchAppointments = (page = 1) => {
    setLoading(true);
    adminAPI.getAppointments({ page, limit: 10, status: filter })
      .then((res) => {
        setAppointments(res.data.appointments);
        setPagination(res.data.pagination);
      })
      .catch(() => toast.error('Failed to load appointments'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchAppointments(); }, [filter]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this appointment?')) return;
    try {
      await adminAPI.deleteAppointment(id);
      toast.success('Appointment deleted');
      fetchAppointments(pagination.page);
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Appointment Management</h2>
        <select className="form-select w-auto" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All Status</option>
          {['Pending', 'Confirmed', 'Completed', 'Cancelled'].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center py-4"><div className="spinner-border text-primary" /></div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-hover bg-white rounded shadow-sm">
              <thead className="table-light">
                <tr>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a) => (
                  <tr key={a._id}>
                    <td>{a.patient?.fullName}</td>
                    <td>Dr. {a.doctor?.name}</td>
                    <td>{formatDate(a.date)}</td>
                    <td>{a.timeSlot}</td>
                    <td><StatusBadge status={a.status} /></td>
                    <td>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(a._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={pagination.page} pages={pagination.pages} onPageChange={fetchAppointments} />
        </>
      )}
    </div>
  );
};

export default AdminAppointments;
