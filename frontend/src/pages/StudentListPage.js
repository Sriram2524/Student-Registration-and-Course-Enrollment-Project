import { useEffect, useMemo, useState } from 'react';
import PageHeader from '../components/PageHeader';
import StatusMessage from '../components/StatusMessage';
import { studentService } from '../services/api';

function StudentListPage() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const response = await studentService.getStudents();
        setStudents(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        setStatus({ type: 'error', text: 'Unable to load students.' });
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    const value = search.trim().toLowerCase();
    if (!value) return students;
    return students.filter((student) => {
      const firstName = student.firstName || student.first_name || '';
      const lastName = student.lastName || student.last_name || '';
      const fullName = `${firstName} ${lastName}`.toLowerCase();
      return fullName.includes(value) || (student.email || '').toLowerCase().includes(value);
    });
  }, [search, students]);

  return (
    <section className="page-card">
      <PageHeader title="Registered Students" />
      <div className="table-surface">
        <div className="toolbar-row">
          <input
            className="form-control"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name or email..."
          />
        </div>
        {status ? <StatusMessage type={status.type}>{status.text}</StatusMessage> : null}
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5">Loading students...</td>
                </tr>
              ) : filteredStudents.length ? (
                filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.firstName || student.first_name}</td>
                    <td>{student.lastName || student.last_name}</td>
                    <td>{student.email}</td>
                    <td>{student.phoneNumber || student.phone_number}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No students found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="table-count">
          Showing {filteredStudents.length} of {students.length} students
        </p>
      </div>
    </section>
  );
}

export default StudentListPage;
