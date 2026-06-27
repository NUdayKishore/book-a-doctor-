import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { doctorAPI } from '../../api';
import { DAYS_OF_WEEK, getImageUrl } from '../../utils/helpers';

const DoctorProfile = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    doctorAPI.getMyProfile()
      .then((res) => {
        setProfile(res.data.doctor);
        setForm({
          name: res.data.doctor.name,
          specialization: res.data.doctor.specialization,
          qualification: res.data.doctor.qualification,
          experience: res.data.doctor.experience,
          consultationFees: res.data.doctor.consultationFees,
          aboutDoctor: res.data.doctor.aboutDoctor || '',
          availableDays: res.data.doctor.availableDays || [],
        });
      })
      .catch(() => toast.error('Failed to load profile'))
      .finally(() => setLoading(false));
  }, []);

  const toggleDay = (day) => {
    setForm((prev) => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      formData.append(key, key === 'availableDays' ? JSON.stringify(val) : val);
    });
    const fileInput = e.target.profileImage;
    if (fileInput?.files[0]) formData.append('profileImage', fileInput.files[0]);

    try {
      const res = await doctorAPI.updateProfile(formData);
      setProfile(res.data.doctor);
      toast.success('Profile updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-4"><div className="spinner-border text-primary" /></div>;

  return (
    <div>
      <h2 className="mb-4">My Profile</h2>
      <div className="card border-0 shadow-sm p-4">
        <form onSubmit={handleSubmit}>
          <div className="text-center mb-4">
            <img src={getImageUrl(profile?.profileImage)} alt="Profile" className="doctor-avatar"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/120?text=Dr'; }} />
            <div className="mt-2">
              <input type="file" name="profileImage" className="form-control form-control-sm w-auto mx-auto" accept="image/*" />
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input className="form-control" value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Specialization</label>
              <input className="form-control" value={form.specialization || ''} onChange={(e) => setForm({ ...form, specialization: e.target.value })} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Qualification</label>
              <input className="form-control" value={form.qualification || ''} onChange={(e) => setForm({ ...form, qualification: e.target.value })} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Experience (years)</label>
              <input type="number" className="form-control" value={form.experience || ''} onChange={(e) => setForm({ ...form, experience: e.target.value })} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Consultation Fees ($)</label>
              <input type="number" className="form-control" value={form.consultationFees || ''} onChange={(e) => setForm({ ...form, consultationFees: e.target.value })} />
            </div>
            <div className="col-12">
              <label className="form-label">About</label>
              <textarea className="form-control" rows="3" value={form.aboutDoctor || ''} onChange={(e) => setForm({ ...form, aboutDoctor: e.target.value })} />
            </div>
            <div className="col-12">
              <label className="form-label">Available Days</label>
              <div className="d-flex flex-wrap gap-2">
                {DAYS_OF_WEEK.map((day) => (
                  <button key={day} type="button"
                    className={`btn btn-sm ${form.availableDays?.includes(day) ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => toggleDay(day)}>{day}</button>
                ))}
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-4" disabled={saving}>
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorProfile;
