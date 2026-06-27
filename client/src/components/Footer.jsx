import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="footer mt-auto">
    <div className="container">
      <div className="row g-4">
        <div className="col-md-4">
          <h5 className="text-white mb-3">Book A Doctor</h5>
          <p>Your trusted healthcare appointment booking platform. Connect with qualified doctors and manage your health easily.</p>
        </div>
        <div className="col-md-4">
          <h6 className="text-white mb-3">Quick Links</h6>
          <ul className="list-unstyled">
            <li><Link to="/doctors">Find Doctors</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </div>
        <div className="col-md-4">
          <h6 className="text-white mb-3">Contact Info</h6>
          <p className="mb-1">📧 support@bookadoctor.com</p>
          <p className="mb-1">📞 +1 (800) 123-4567</p>
          <p>📍 123 Healthcare Ave, Medical City</p>
        </div>
      </div>
      <hr className="border-secondary my-4" />
      <p className="text-center mb-0 small">&copy; {new Date().getFullYear()} Book A Doctor. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
