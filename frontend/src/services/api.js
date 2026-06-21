import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || '',
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
