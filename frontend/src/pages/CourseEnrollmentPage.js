import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import StatusMessage from '../components/StatusMessage';
import { courseService, enrollmentService, studentService } from '../services/api';

const initialForm = {
  studentId: '',
  courseId: '',
  enrollmentDate: ''
};

function CourseEnrollmentPage() {
  const [form, setForm] = useState(initialForm);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: 'info', text: 'Please select a student and course to enroll.' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [studentResponse, courseResponse] = await Promise.all([
          studentService.getStudents(),
          courseService.getCourses()
        ]);
        setStudents(Array.isArray(studentResponse.data) ? studentResponse.data : []);
        setCourses(Array.isArray(courseResponse.data) ? courseResponse.data : []);
      } catch (error) {
        setStatus({ type: 'error', text: 'Unable to load students or courses.' });
      }
    };

    loadOptions();
  }, []);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const validate = () => {
    const nextErrors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = form.enrollmentDate ? new Date(`${form.enrollmentDate}T00:00:00`) : null;

    if (!form.studentId) nextErrors.studentId = 'Select a student.';
    if (!form.courseId) nextErrors.courseId = 'Select a course.';
    if (!selectedDate) nextErrors.enrollmentDate = 'Enrollment date is required.';
    if (selectedDate && selectedDate > today) nextErrors.enrollmentDate = 'Enrollment date cannot be in the future.';
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus({ type: 'error', text: 'Please correct the highlighted fields.' });
      return;
    }

    setSubmitting(true);
    try {
      const response = await enrollmentService.createEnrollment({
        studentId: Number(form.studentId),
        courseId: Number(form.courseId),
        enrollmentDate: form.enrollmentDate
      });
      setForm(initialForm);
      setStatus({ type: 'success', text: response.data?.message || 'Enrollment created successfully.' });
    } catch (error) {
      setStatus({
        type: 'error',
        text: error.response?.data?.message || 'Unable to save enrollment. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="page-card">
      <PageHeader title="Course Enrollment" />
      <form className="form-surface" onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label" htmlFor="studentId">
            Student <span>*</span>
          </label>
          <select
            className={`form-select ${errors.studentId ? 'is-invalid' : ''}`}
            id="studentId"
            name="studentId"
            value={form.studentId}
            onChange={updateField}
          >
            <option value="">Select a student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.firstName || student.first_name} {student.lastName || student.last_name}
              </option>
            ))}
          </select>
          {errors.studentId ? <div className="invalid-feedback">{errors.studentId}</div> : null}
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="courseId">
            Course Name <span>*</span>
          </label>
          <select
            className={`form-select ${errors.courseId ? 'is-invalid' : ''}`}
            id="courseId"
            name="courseId"
            value={form.courseId}
            onChange={updateField}
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.courseName || course.course_name}
              </option>
            ))}
          </select>
          {errors.courseId ? <div className="invalid-feedback">{errors.courseId}</div> : null}
        </div>
        <div className="mb-4">
          <label className="form-label" htmlFor="enrollmentDate">
            Enrollment Date <span>*</span>
          </label>
          <input
            className={`form-control ${errors.enrollmentDate ? 'is-invalid' : ''}`}
            id="enrollmentDate"
            name="enrollmentDate"
            type="date"
            value={form.enrollmentDate}
            onChange={updateField}
          />
          {errors.enrollmentDate ? <div className="invalid-feedback">{errors.enrollmentDate}</div> : null}
        </div>
        <div className="form-actions">
          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
        {status ? <StatusMessage type={status.type}>{status.text}</StatusMessage> : null}
      </form>
    </section>
  );
}

export default CourseEnrollmentPage;
