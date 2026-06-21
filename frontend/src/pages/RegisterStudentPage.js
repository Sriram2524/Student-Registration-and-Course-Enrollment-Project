import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import StatusMessage from '../components/StatusMessage';
import { studentService } from '../services/api';

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: ''
};

function RegisterStudentPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.firstName.trim()) nextErrors.firstName = 'First name is required.';
    if (!form.lastName.trim()) nextErrors.lastName = 'Last name is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Enter a valid email.';
    if (!/^\d+$/.test(form.phoneNumber)) nextErrors.phoneNumber = 'Phone number must be numeric.';
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
    setStatus(null);
    try {
      const response = await studentService.createStudent(form);
      setForm(initialForm);
      setStatus({ type: 'success', text: response.data?.message || 'Student registered successfully.' });
    } catch (error) {
      setStatus({
        type: 'error',
        text: error.response?.data?.message || 'Unable to register student. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="page-card">
      <PageHeader title="Register Student" />
      <form className="form-surface" onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label" htmlFor="firstName">
            First Name <span>*</span>
          </label>
          <input
            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
            id="firstName"
            name="firstName"
            value={form.firstName}
            onChange={updateField}
            placeholder="Enter first name"
          />
          {errors.firstName ? <div className="invalid-feedback">{errors.firstName}</div> : null}
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="lastName">
            Last Name <span>*</span>
          </label>
          <input
            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
            id="lastName"
            name="lastName"
            value={form.lastName}
            onChange={updateField}
            placeholder="Enter last name"
          />
          {errors.lastName ? <div className="invalid-feedback">{errors.lastName}</div> : null}
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            Email <span>*</span>
          </label>
          <input
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={updateField}
            placeholder="Enter email address"
          />
          {errors.email ? <div className="invalid-feedback">{errors.email}</div> : null}
        </div>
        <div className="mb-4">
          <label className="form-label" htmlFor="phoneNumber">
            Phone Number <span>*</span>
          </label>
          <input
            className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
            id="phoneNumber"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={updateField}
            placeholder="Enter phone number"
          />
          {errors.phoneNumber ? <div className="invalid-feedback">{errors.phoneNumber}</div> : null}
        </div>
        <div className="form-actions">
          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? 'Registering...' : 'Register Student'}
          </button>
          <button className="btn btn-outline-secondary" type="button" onClick={() => setForm(initialForm)}>
            Reset
          </button>
        </div>
        {status ? <StatusMessage type={status.type}>{status.text}</StatusMessage> : null}
      </form>
    </section>
  );
}



export default RegisterStudentPage;
