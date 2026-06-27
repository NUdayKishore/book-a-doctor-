import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { toast } from 'react-toastify';
import { adminAPI } from '../../api';
import { formatDate } from '../../utils/helpers';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminAPI.getStats()
      .then((res) => setStats(res.data.stats))
      .catch(() => toast.error('Failed to load stats'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="row g-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="col-md-3"><div className="card p-3 skeleton" style={{ height: 100 }} /></div>
        ))}
      </div>
    );
  }

  const statusData = stats?.appointmentsByStatus || [];
  const doughnutData = {
    labels: statusData.map((s) => s._id),
    datasets: [{
      data: statusData.map((s) => s.count),
      backgroundColor: ['#ffc107', '#198754', '#0d6efd', '#dc3545'],
    }],
  };

  const barData = {
    labels: ['Users', 'Doctors', 'Patients', 'Appointments'],
    datasets: [{
      label: 'Platform Stats',
      data: [stats.totalUsers, stats.totalDoctors, stats.totalPatients, stats.totalAppointments],
      backgroundColor: '#0d6efd',
    }],
  };

  return (
    <div>
      <h2 className="mb-4">Admin Dashboard</h2>

      <div className="row g-4 mb-4">
        {[
          { label: 'Total Users', value: stats.totalUsers, icon: '👥' },
          { label: 'Doctors', value: stats.totalDoctors, icon: '👨‍⚕️' },
          { label: 'Patients', value: stats.totalPatients, icon: '🏥' },
          { label: 'Appointments', value: stats.totalAppointments, icon: '📅' },
        ].map((s) => (
          <div key={s.label} className="col-md-3">
            <div className="card stat-card p-3">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="text-muted">{s.label}</h6>
                  <h2 className="text-primary mb-0">{s.value}</h2>
                </div>
                <span className="fs-2">{s.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {stats.pendingDoctors > 0 && (
        <div className="alert alert-warning">{stats.pendingDoctors} doctor(s) pending approval</div>
      )}

      <div className="row g-4 mb-4">
        <div className="col-md-5">
          <div className="card p-3 border-0 shadow-sm">
            <h6 className="text-primary">Appointments by Status</h6>
            <Doughnut data={doughnutData} />
          </div>
        </div>
        <div className="col-md-7">
          <div className="card p-3 border-0 shadow-sm">
            <h6 className="text-primary">Platform Overview</h6>
            <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm p-3">
        <h6 className="text-primary mb-3">Recent Appointments</h6>
        <div className="table-responsive">
          <table className="table table-sm">
            <thead><tr><th>Patient</th><th>Doctor</th><th>Date</th><th>Status</th></tr></thead>
            <tbody>
              {stats.recentAppointments?.map((a) => (
                <tr key={a._id}>
                  <td>{a.patient?.fullName}</td>
                  <td>Dr. {a.doctor?.name}</td>
                  <td>{formatDate(a.date)}</td>
                  <td><span className="badge bg-primary">{a.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
