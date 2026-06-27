import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { appointmentAPI, reportAPI } from '../../api';
import StatusBadge from '../../components/StatusBadge';
import { formatDate } from '../../utils/helpers';

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rescheduleId, setRescheduleId] = useState(null);
  const [rescheduleForm, setRescheduleForm] = useState({ date: '', timeSlot: '' });
  const [uploadId, setUploadId] = useState(null);

  const fetchAppointments = () => {
    appointmentAPI.getMy()
      .then((res) => setAppointments(res.data.appointments))
      .catch(() => toast.error('Failed to load appointments'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchAppointments(); }, []);

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this appointment?')) return;
    try {
      await appointmentAPI.updateStatus(id, 'Cancelled');
      toast.success('Appointment cancelled');
      fetchAppointments();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel');
    }
  };

  const handleReschedule = async (e) => {
    e.preventDefault();
    try {
      await appointmentAPI.reschedule(rescheduleId, rescheduleForm);
      toast.success('Appointment rescheduled');
      setRescheduleId(null);
      fetchAppointments();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to reschedule');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = e.target.report.files[0];
    if (!file) return toast.error('Select a file');
    const formData = new FormData();
    formData.append('report', file);
    try {
      await reportAPI.upload(uploadId, formData);
      toast.success('Report uploaded');
      setUploadId(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    }
  };

  if (loading) return <div className="text-center py-4"><div className="spinner-border text-primary" /></div>;

  return (
    <div>
      <h2 className="mb-4">My Appointments</h2>

      {appointments.length === 0 ? (
        <div className="card p-4 text-center text-muted">No appointments found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover bg-white rounded shadow-sm">
            <thead className="table-light">
              <tr>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((apt) => (
                <tr key={apt._id}>
                  <td>Dr. {apt.doctor?.name}<br /><small className="text-muted">{apt.doctor?.specialization}</small></td>
                  <td>{formatDate(apt.date)}</td>
                  <td>{apt.timeSlot}</td>
                  <td><StatusBadge status={apt.status} /></td>
                  <td>
                    {!['Completed', 'Cancelled'].includes(apt.status) && (
                      <div className="btn-group btn-group-sm">
                        <button className="btn btn-outline-warning" onClick={() => setRescheduleId(apt._id)}>Reschedule</button>
                        <button className="btn btn-outline-danger" onClick={() => handleCancel(apt._id)}>Cancel</button>
                        <button className="btn btn-outline-primary" onClick={() => setUploadId(apt._id)}>Upload Report</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {rescheduleId && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Reschedule Appointment</h5>
                <button className="btn-close" onClick={() => setRescheduleId(null)} />
              </div>
              <form onSubmit={handleReschedule}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">New Date</label>
                    <input type="date" className="form-control" required value={rescheduleForm.date}
                      onChange={(e) => setRescheduleForm({ ...rescheduleForm, date: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">New Time Slot</label>
                    <input className="form-control" placeholder="e.g. 09:00 - 10:00" required value={rescheduleForm.timeSlot}
                      onChange={(e) => setRescheduleForm({ ...rescheduleForm, timeSlot: e.target.value })} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setRescheduleId(null)}>Close</button>
                  <button type="submit" className="btn btn-primary">Reschedule</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {uploadId && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Upload Medical Report</h5>
                <button className="btn-close" onClick={() => setUploadId(null)} />
              </div>
              <form onSubmit={handleUpload}>
                <div className="modal-body">
                  <input type="file" name="report" className="form-control" accept=".pdf,.jpg,.jpeg,.png" required />
                  <small className="text-muted">PDF, JPG, PNG — max 5MB</small>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setUploadId(null)}>Close</button>
                  <button type="submit" className="btn btn-primary">Upload</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientAppointments;
