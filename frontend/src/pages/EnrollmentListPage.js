import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import StatusMessage from '../components/StatusMessage';
import { enrollmentService } from '../services/api';

function EnrollmentListPage() {
  const [enrollments, setEnrollments] = useState([]);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEnrollments = async () => {
      try {
        const response = await enrollmentService.getEnrollments();
        setEnrollments(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        setStatus({ type: 'error', text: 'Unable to load enrollments.' });
      } finally {
        setLoading(false);
      }
    };

    loadEnrollments();
  }, []);

  return (
    <section className="page-card">
      <PageHeader title="Enrollment List" />
      <div className="table-surface">
        {status ? <StatusMessage type={status.type}>{status.text}</StatusMessage> : null}
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Student Name</th>
                <th>Course Name</th>
                <th>Enrollment Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4">Loading enrollments...</td>
                </tr>
              ) : enrollments.length ? (
                enrollments.map((enrollment) => (
                  <tr key={enrollment.id}>
                    <td>{enrollment.id}</td>
                    <td>
                      {enrollment.studentName ||
                        enrollment.student_name ||
                        `${enrollment.firstName || enrollment.first_name || ''} ${
                          enrollment.lastName || enrollment.last_name || ''
                        }`}
                    </td>
                    <td>{enrollment.courseName || enrollment.course_name}</td>
                    <td>{enrollment.enrollmentDate || enrollment.enrollment_date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No enrollments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="table-count">Showing {enrollments.length} enrollments</p>
      </div>
    </section>
  );
}

export default EnrollmentListPage;
