import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { adminAPI } from '../../api';
import { getApprovalBadge } from '../../components/StatusBadge';
import Pagination from '../../components/Pagination';

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchDoctors = (page = 1) => {
    setLoading(true);
    adminAPI.getDoctors({ status: filter, page, limit: 10 })
      .then((res) => {
        setDoctors(res.data.doctors);
        setPagination(res.data.pagination);
      })
      .catch(() => toast.error('Failed to load doctors'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchDoctors(); }, [filter]);

  const handleApproval = async (id, status) => {
    try {
      await adminAPI.updateDoctorApproval(id, status);
      toast.success(`Doctor ${status}`);
      fetchDoctors(pagination.page);
    } catch {
      toast.error('Action failed');
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Doctor Management</h2>
        <select className="form-select w-auto" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All</option>
          {['pending', 'approved', 'rejected', 'suspended'].map((s) => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
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
                  <th>Name</th>
                  <th>Specialization</th>
                  <th>Experience</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((d) => (
                  <tr key={d._id}>
                    <td>{d.name}<br /><small className="text-muted">{d.email}</small></td>
                    <td>{d.specialization}</td>
                    <td>{d.experience} yrs</td>
                    <td><span className={`badge bg-${getApprovalBadge(d.approvalStatus)}`}>{d.approvalStatus}</span></td>
                    <td>
                      {d.approvalStatus === 'pending' && (
                        <>
                          <button className="btn btn-sm btn-success me-1" onClick={() => handleApproval(d._id, 'approved')}>Approve</button>
                          <button className="btn btn-sm btn-danger me-1" onClick={() => handleApproval(d._id, 'rejected')}>Reject</button>
                        </>
                      )}
                      {d.approvalStatus === 'approved' && (
                        <button className="btn btn-sm btn-warning" onClick={() => handleApproval(d._id, 'suspended')}>Suspend</button>
                      )}
                      {d.approvalStatus === 'suspended' && (
                        <button className="btn btn-sm btn-success" onClick={() => handleApproval(d._id, 'approved')}>Reactivate</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={pagination.page} pages={pagination.pages} onPageChange={fetchDoctors} />
        </>
      )}
    </div>
  );
};

export default AdminDoctors;
