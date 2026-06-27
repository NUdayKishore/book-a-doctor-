import api from './axios';

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  logout: () => api.post('/auth/logout'),
};

export const doctorAPI = {
  getAll: (params) => api.get('/doctors', { params }),
  getById: (id) => api.get(`/doctors/${id}`),
  getMyProfile: () => api.get('/doctors/profile/me'),
  updateProfile: (data) => api.put('/doctors/profile/me', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getMyAppointments: (params) => api.get('/doctors/appointments/me', { params }),
  getMyStats: () => api.get('/doctors/stats/me'),
  getSpecializations: () => api.get('/doctors/specializations'),
};

export const appointmentAPI = {
  create: (data) => api.post('/appointments', data),
  getMy: (params) => api.get('/appointments/my', { params }),
  getById: (id) => api.get(`/appointments/${id}`),
  updateStatus: (id, status) => api.patch(`/appointments/${id}/status`, { status }),
  reschedule: (id, data) => api.patch(`/appointments/${id}/reschedule`, data),
  delete: (id) => api.delete(`/appointments/${id}`),
};

export const reportAPI = {
  upload: (appointmentId, formData) => api.post(`/reports/${appointmentId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getByAppointment: (appointmentId) => api.get(`/reports/appointment/${appointmentId}`),
  getMy: () => api.get('/reports/my'),
  delete: (id) => api.delete(`/reports/${id}`),
};

export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getDoctors: (params) => api.get('/admin/doctors', { params }),
  updateDoctorApproval: (id, status) => api.patch(`/admin/doctors/${id}/approval`, { status }),
  getUsers: (params) => api.get('/admin/users', { params }),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getAppointments: (params) => api.get('/admin/appointments', { params }),
  deleteAppointment: (id) => api.delete(`/admin/appointments/${id}`),
};
