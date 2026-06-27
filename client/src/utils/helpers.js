export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatTime = (timeSlot) => timeSlot || '';

export const getImageUrl = (path) => {
  if (!path) return 'https://via.placeholder.com/200x200?text=Doctor';
  if (path.startsWith('http')) return path;
  return path.startsWith('/') ? path : `/${path}`;
};

export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validatePhone = (phone) => /^[0-9+\-\s()]{10,15}$/.test(phone);

export const DAYS_OF_WEEK = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
];

export const getDashboardPath = (role) => {
  const paths = {
    patient: '/patient/dashboard',
    doctor: '/doctor/dashboard',
    admin: '/admin/dashboard',
  };
  return paths[role] || '/';
};
