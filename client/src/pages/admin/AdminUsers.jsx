import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { adminAPI } from '../../api';
import Pagination from '../../components/Pagination';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);

  const fetchUsers = (page = 1) => {
    setLoading(true);
    adminAPI.getUsers({ page, limit: 10 })
      .then((res) => {
        setUsers(res.data.users);
        setPagination(res.data.pagination);
      })
      .catch(() => toast.error('Failed to load users'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await adminAPI.deleteUser(id);
      toast.success('User deleted');
      fetchUsers(pagination.page);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div>
      <h2 className="mb-4">User Management</h2>
      {loading ? (
        <div className="text-center py-4"><div className="spinner-border text-primary" /></div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-hover bg-white rounded shadow-sm">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.fullName}</td>
                    <td>{u.email}</td>
                    <td>{u.phoneNumber}</td>
                    <td><span className="badge bg-primary">{u.role}</span></td>
                    <td>
                      {u.role !== 'admin' && (
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(u._id)}>Delete</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={pagination.page} pages={pagination.pages} onPageChange={fetchUsers} />
        </>
      )}
    </div>
  );
};

export default AdminUsers;
