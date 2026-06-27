const About = () => (
  <div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <h1 className="section-title">About Book A Doctor</h1>
        <p className="lead text-muted">
          Book A Doctor is a modern healthcare appointment booking platform designed to bridge
          the gap between patients and qualified medical professionals.
        </p>

        <div className="card border-0 shadow-sm p-4 mb-4">
          <h4 className="text-primary">Our Mission</h4>
          <p>
            We aim to make healthcare accessible, convenient, and transparent. Our platform
            empowers patients to find the right doctor, book appointments effortlessly, and
            manage their medical records — while giving doctors the tools to manage their practice efficiently.
          </p>
        </div>

        <div className="row g-4">
          {[
            { title: 'For Patients', items: ['Search & filter doctors', 'Book & manage appointments', 'Upload medical reports', 'Real-time status updates'] },
            { title: 'For Doctors', items: ['Professional profile management', 'Appointment scheduling', 'View patient reports', 'Dashboard analytics'] },
            { title: 'For Admins', items: ['Doctor approval workflow', 'User management', 'Platform analytics', 'Appointment oversight'] },
          ].map((section) => (
            <div key={section.title} className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-3">
                <h5 className="text-primary">{section.title}</h5>
                <ul className="small text-muted">
                  {section.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default About;
