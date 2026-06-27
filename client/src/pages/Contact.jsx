import { useState } from 'react';
import { toast } from 'react-toastify';
import { validateEmail } from '../utils/helpers';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!validateEmail(form.email)) errs.email = 'Valid email is required';
    if (!form.subject.trim()) errs.subject = 'Subject is required';
    if (!form.message.trim()) errs.message = 'Message is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    toast.success('Message sent successfully! We will get back to you soon.');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="section-title text-center">Contact Us</h1>
          <p className="text-center text-muted mb-5">Have questions? We&apos;d love to hear from you.</p>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm p-3 text-center h-100">
                <div className="fs-2 mb-2">📧</div>
                <h6>Email</h6>
                <p className="small text-muted mb-0">support@bookadoctor.com</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm p-3 text-center h-100">
                <div className="fs-2 mb-2">📞</div>
                <h6>Phone</h6>
                <p className="small text-muted mb-0">+1 (800) 123-4567</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm p-3 text-center h-100">
                <div className="fs-2 mb-2">📍</div>
                <h6>Address</h6>
                <p className="small text-muted mb-0">123 Healthcare Ave, Medical City</p>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm p-4 mt-4">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Name</label>
                  <input className={`form-control ${errors.name ? 'is-invalid' : ''}`} value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="col-12">
                  <label className="form-label">Subject</label>
                  <input className={`form-control ${errors.subject ? 'is-invalid' : ''}`} value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                  {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                </div>
                <div className="col-12">
                  <label className="form-label">Message</label>
                  <textarea rows="4" className={`form-control ${errors.message ? 'is-invalid' : ''}`} value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary px-4">Send Message</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
