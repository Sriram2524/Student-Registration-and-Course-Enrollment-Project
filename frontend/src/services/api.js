import axios from 'axios';

const PRODUCTION_API_BASE_URL = 'https://students-portal-backend-6ynh.onrender.com';

const getApiBaseUrl = () => {
  if (process.env.REACT_APP_API_BASE_URL) {
    return process.env.REACT_APP_API_BASE_URL;
  }

  if (typeof window !== 'undefined' && window.location.hostname.endsWith('vercel.app')) {
    return PRODUCTION_API_BASE_URL;
  }

  return '';
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

export const studentService = {
  createStudent: (payload) => api.post('/api/students', payload),
  getStudents: () => api.get('/api/students')
};

export const courseService = {
  getCourses: () => api.get('/api/courses')
};

export const enrollmentService = {
  createEnrollment: (payload) => api.post('/api/enrollments', payload),
  getEnrollments: () => api.get('/api/enrollments')
};

export default api;
