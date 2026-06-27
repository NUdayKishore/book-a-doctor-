import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { doctorAPI } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { SkeletonStats } from '../../components/LoadingSkeleton';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([doctorAPI.getMyStats(), doctorAPI.getMyProfile()])
      .then(([statsRes, profileRes]) => {
        setStats(statsRes.data.stats);
        setProfile(profileRes.data.doctor);
      })
      .catch(() => toast.error('Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <SkeletonStats />;

  return (
    <div>
      <h2 className="mb-4">Welcome, Dr. {user?.fullName}</h2>

      {profile?.approvalStatus === 'pending' && (
        <div className="alert alert-warning">Your profile is pending admin approval.</div>
      )}
      {profile?.approvalStatus === 'rejected' && (
        <div className="alert alert-danger">Your profile has been rejected. Contact admin.</div>
      )}
      {profile?.approvalStatus === 'suspended' && (
        <div className="alert alert-secondary">Your account has been suspended.</div>
      )}

      <div className="row g-4">
        {[
          { label: 'Total', value: stats?.total, color: 'primary' },
          { label: 'Pending', value: stats?.pending, color: 'warning' },
          { label: 'Confirmed', value: stats?.confirmed, color: 'success' },
          { label: 'Completed', value: stats?.completed, color: 'info' },
        ].map((s) => (
          <div key={s.label} className="col-md-3">
            <div className="card stat-card p-3">
              <h6 className="text-muted">{s.label}</h6>
              <h2 className={`text-${s.color} mb-0`}>{s.value || 0}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorDashboard;
