import { Link } from 'react-router-dom';

const Home = () => (
  <>
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7">
            <h1 className="mb-4">Your Health, Our Priority</h1>
            <p className="lead mb-4">
              Book appointments with trusted doctors instantly. Search by specialization,
              compare fees, and manage your healthcare journey — all in one place.
            </p>
            <div className="d-flex gap-3 flex-wrap">
              <Link to="/doctors" className="btn btn-light btn-lg px-4">Find Doctors</Link>
              <Link to="/register" className="btn btn-outline-light btn-lg px-4">Get Started</Link>
            </div>
          </div>
          <div className="col-lg-5 text-center d-none d-lg-block">
            <div style={{ fontSize: '8rem', opacity: 0.3 }}>🏥</div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-5">
      <div className="container">
        <h2 className="text-center section-title">Why Choose Book A Doctor?</h2>
        <div className="row g-4 mt-2">
          {[
            { icon: '🔍', title: 'Easy Search', desc: 'Find doctors by specialization, experience, and availability.' },
            { icon: '📅', title: 'Quick Booking', desc: 'Book appointments in seconds with real-time slot availability.' },
            { icon: '📋', title: 'Medical Reports', desc: 'Upload and share medical reports securely with your doctor.' },
            { icon: '🔔', title: 'Live Updates', desc: 'Get real-time notifications on appointment status changes.' },
          ].map((f) => (
            <div key={f.title} className="col-md-6 col-lg-3">
              <div className="text-center p-4">
                <div className="feature-icon mx-auto">{f.icon}</div>
                <h5>{f.title}</h5>
                <p className="text-muted small">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-5 bg-light">
      <div className="container text-center">
        <h2 className="section-title">Ready to Take Care of Your Health?</h2>
        <p className="text-muted mb-4">Join thousands of patients who trust Book A Doctor for their healthcare needs.</p>
        <Link to="/register" className="btn btn-primary btn-lg">Create Free Account</Link>
      </div>
    </section>
  </>
);

export default Home;
