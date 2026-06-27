import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePhone, getDashboardPath } from '../utils/helpers';

const Register = () => {
  const [role, setRole] = useState('patient');
  const [form, setForm] = useState({
    fullName: '', email: '', password: '', phoneNumber: '',
    specialization: '', qualification: 'MBBS', experience: 0, consultationFees: 500,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required';
    if (!validateEmail(form.email)) errs.email = 'Valid email is required';
    if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (!validatePhone(form.phoneNumber)) errs.phoneNumber = 'Valid phone number is required';
    if (role === 'doctor' && !form.specialization.trim()) errs.specialization = 'Specialization is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const data = { ...form, role };
      const user = await register(data);
      toast.success('Registration successful!');
      navigate(getDashboardPath(user.role));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="card auth-card p-4">
        <h2 className="text-center text-primary mb-1">Create Account</h2>
        <p className="text-center text-muted mb-4">Join Book A Doctor today</p>

        <div className="btn-group w-100 mb-4">
          <button type="button" className={`btn ${role === 'patient' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setRole('patient')}>Patient</button>
          <button type="button" className={`btn ${role === 'doctor' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setRole('doctor')}>Doctor</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input className={`form-control ${errors.fullName ? 'is-invalid' : ''}`} value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
            {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })} />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`} value={form.phoneNumber}
              onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} />
            {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
          </div>

          {role === 'doctor' && (
            <>
              <div className="mb-3">
                <label className="form-label">Specialization</label>
                <input className={`form-control ${errors.specialization ? 'is-invalid' : ''}`} value={form.specialization}
                  onChange={(e) => setForm({ ...form, specialization: e.target.value })} />
                {errors.specialization && <div className="invalid-feedback">{errors.specialization}</div>}
              </div>
              <div className="row g-3 mb-3">
                <div className="col-md-4">
                  <label className="form-label">Qualification</label>
                  <input className="form-control" value={form.qualification}
                    onChange={(e) => setForm({ ...form, qualification: e.target.value })} />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Experience (yrs)</label>
                  <input type="number" className="form-control" value={form.experience}
                    onChange={(e) => setForm({ ...form, experience: e.target.value })} />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Fees ($)</label>
                  <input type="number" className="form-control" value={form.consultationFees}
                    onChange={(e) => setForm({ ...form, consultationFees: e.target.value })} />
                </div>
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="text-center mb-0">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
