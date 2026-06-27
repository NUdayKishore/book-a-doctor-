import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { SocketProvider } from './context/SocketContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import DoctorListing from './pages/DoctorListing';
import DoctorDetails from './pages/DoctorDetails';
import BookAppointment from './pages/BookAppointment';

import PatientDashboard from './pages/patient/PatientDashboard';
import PatientAppointments from './pages/patient/PatientAppointments';
import PatientReports from './pages/patient/PatientReports';

import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import DoctorProfile from './pages/doctor/DoctorProfile';
import DoctorReports from './pages/doctor/DoctorReports';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminDoctors from './pages/admin/AdminDoctors';
import AdminUsers from './pages/admin/AdminUsers';
import AdminAppointments from './pages/admin/AdminAppointments';

const patientSidebar = [
  { path: '/patient/dashboard', label: 'Dashboard', icon: '📊', end: true },
  { path: '/patient/appointments', label: 'Appointments', icon: '📅' },
  { path: '/patient/reports', label: 'Reports', icon: '📋' },
];

const doctorSidebar = [
  { path: '/doctor/dashboard', label: 'Dashboard', icon: '📊', end: true },
  { path: '/doctor/appointments', label: 'Appointments', icon: '📅' },
  { path: '/doctor/reports', label: 'Reports', icon: '📋' },
  { path: '/doctor/profile', label: 'Profile', icon: '👤' },
];

const adminSidebar = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: '📊', end: true },
  { path: '/admin/doctors', label: 'Doctors', icon: '👨‍⚕️' },
  { path: '/admin/users', label: 'Users', icon: '👥' },
  { path: '/admin/appointments', label: 'Appointments', icon: '📅' },
];

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <SocketProvider>
            <div className="d-flex flex-column min-vh-100">
              <Navbar />
              <main className="flex-grow-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/doctors" element={<DoctorListing />} />
                  <Route path="/doctors/:id" element={<DoctorDetails />} />
                  <Route path="/doctors/:id/book" element={
                    <ProtectedRoute roles={['patient']}>
                      <BookAppointment />
                    </ProtectedRoute>
                  } />

                  <Route path="/patient" element={
                    <ProtectedRoute roles={['patient']}>
                      <DashboardLayout sidebarItems={patientSidebar} title="Patient Portal" />
                    </ProtectedRoute>
                  }>
                    <Route path="dashboard" element={<PatientDashboard />} />
                    <Route path="appointments" element={<PatientAppointments />} />
                    <Route path="reports" element={<PatientReports />} />
                  </Route>

                  <Route path="/doctor" element={
                    <ProtectedRoute roles={['doctor']}>
                      <DashboardLayout sidebarItems={doctorSidebar} title="Doctor Portal" />
                    </ProtectedRoute>
                  }>
                    <Route path="dashboard" element={<DoctorDashboard />} />
                    <Route path="appointments" element={<DoctorAppointments />} />
                    <Route path="reports" element={<DoctorReports />} />
                    <Route path="profile" element={<DoctorProfile />} />
                  </Route>

                  <Route path="/admin" element={
                    <ProtectedRoute roles={['admin']}>
                      <DashboardLayout sidebarItems={adminSidebar} title="Admin Portal" />
                    </ProtectedRoute>
                  }>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="doctors" element={<AdminDoctors />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="appointments" element={<AdminAppointments />} />
                  </Route>
                </Routes>
              </main>
              <Footer />
              <ToastContainer position="top-right" autoClose={3000} theme="colored" />
            </div>
          </SocketProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
