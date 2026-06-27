import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { validateEmail } from '../utils/helpers';
import { getDashboardPath } from '../utils/helpers';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;

  const validate = () => {
    const errs = {};
    if (!validateEmail(form.email)) errs.email = 'Valid email is required';
    if (!form.password) errs.password = 'Password is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      toast.success('Login successful!');
      navigate(from || getDashboardPath(user.role));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="card auth-card p-4">
        <h2 className="text-center text-primary mb-1">Welcome Back</h2>
        <p className="text-center text-muted mb-4">Sign in to your account</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <p className="text-center mb-0">
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
        <p className="text-center text-muted small mt-2 mb-0">
          Admin: admin@bookadoctor.com / admin123
        </p>
      </div>
    </div>
  );
};

export default Login;
