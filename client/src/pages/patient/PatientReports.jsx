import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { reportAPI } from '../../api';
import { formatDate } from '../../utils/helpers';

const PatientReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    reportAPI.getMy()
      .then((res) => setReports(res.data.reports))
      .catch(() => toast.error('Failed to load reports'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this report?')) return;
    try {
      await reportAPI.delete(id);
      setReports((prev) => prev.filter((r) => r._id !== id));
      toast.success('Report deleted');
    } catch {
      toast.error('Failed to delete report');
    }
  };

  if (loading) return <div className="text-center py-4"><div className="spinner-border text-primary" /></div>;

  return (
    <div>
      <h2 className="mb-4">My Reports</h2>
      {reports.length === 0 ? (
        <div className="card p-4 text-center text-muted">No reports uploaded yet.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover bg-white rounded shadow-sm">
            <thead className="table-light">
              <tr>
                <th>File</th>
                <th>Doctor</th>
                <th>Appointment</th>
                <th>Uploaded</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r._id}>
                  <td>{r.originalName}</td>
                  <td>Dr. {r.doctor?.name}</td>
                  <td>{formatDate(r.appointment?.date)} — {r.appointment?.timeSlot}</td>
                  <td>{formatDate(r.createdAt)}</td>
                  <td>
                    <a href={r.filePath} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary me-1">View</a>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(r._id)}>Delete</button>
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

export default PatientReports;
