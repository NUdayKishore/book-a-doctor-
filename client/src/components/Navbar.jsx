import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useSocket } from '../context/SocketContext';
import { getDashboardPath } from '../utils/helpers';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const { notifications, markAllRead } = useSocket();
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="brand-icon">+</span> Book A Doctor
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/doctors">Find Doctors</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">Contact</NavLink>
            </li>
          </ul>

          <ul className="navbar-nav align-items-center gap-2">
            <li className="nav-item">
              <button className="btn btn-outline-light btn-sm" onClick={toggleDarkMode} title="Toggle dark mode">
                {darkMode ? '☀️' : '🌙'}
              </button>
            </li>

            {isAuthenticated && (
              <li className="nav-item dropdown">
                <button className="btn btn-outline-light btn-sm position-relative dropdown-toggle" data-bs-toggle="dropdown">
                  🔔
                  {unreadCount > 0 && (
                    <span className="badge bg-danger notification-badge">{unreadCount}</span>
                  )}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" style={{ width: '300px' }}>
                  <li className="dropdown-header d-flex justify-content-between">
                    Notifications
                    <button className="btn btn-link btn-sm p-0" onClick={markAllRead}>Mark all read</button>
                  </li>
                  {notifications.length === 0 ? (
                    <li className="dropdown-item text-muted">No notifications</li>
                  ) : (
                    notifications.slice(0, 5).map((n) => (
                      <li key={n.id} className={`dropdown-item notification-item ${n.read ? '' : 'unread'}`}>
                        Appointment {n.type}: {n.data?.status || 'Updated'}
                      </li>
                    ))
                  )}
                </ul>
              </li>
            )}

            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="btn btn-light btn-sm" to={getDashboardPath(user.role)}>
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="btn btn-outline-light btn-sm" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-light btn-sm" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
