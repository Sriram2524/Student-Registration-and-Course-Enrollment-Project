import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import HomePage from './pages/HomePage';
import RegisterStudentPage from './pages/RegisterStudentPage';
import StudentListPage from './pages/StudentListPage';
import CourseEnrollmentPage from './pages/CourseEnrollmentPage';
import EnrollmentListPage from './pages/EnrollmentListPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/students/register" element={<RegisterStudentPage />} />
          <Route path="/students" element={<StudentListPage />} />
          <Route path="/enroll" element={<CourseEnrollmentPage />} />
          <Route path="/enrollments" element={<EnrollmentListPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
