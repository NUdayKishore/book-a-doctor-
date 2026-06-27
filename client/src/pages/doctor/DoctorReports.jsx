import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { reportAPI } from '../../api';
import { formatDate } from '../../utils/helpers';

const DoctorReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    reportAPI.getMy()
      .then((res) => setReports(res.data.reports))
      .catch(() => toast.error('Failed to load reports'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-4"><div className="spinner-border text-primary" /></div>;

  return (
    <div>
      <h2 className="mb-4">Patient Reports</h2>
      {reports.length === 0 ? (
        <div className="card p-4 text-center text-muted">No reports uploaded yet.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover bg-white rounded shadow-sm">
            <thead className="table-light">
              <tr>
                <th>Patient</th>
                <th>File</th>
                <th>Appointment</th>
                <th>Uploaded</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r._id}>
                  <td>{r.patient?.fullName}</td>
                  <td>{r.originalName}</td>
                  <td>{formatDate(r.appointment?.date)} — {r.appointment?.timeSlot}</td>
                  <td>{formatDate(r.createdAt)}</td>
                  <td><a href={r.filePath} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary">View</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DoctorReports;
