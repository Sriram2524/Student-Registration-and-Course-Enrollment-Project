import { ArrowRight, BookOpen, GraduationCap, UserPlus, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const quickLinks = [
  {
    title: 'Register Student',
    text: 'Add a new student record.',
    to: '/students/register',
    icon: UserPlus,
    tone: 'blue',
    action: 'Register Now'
  },
  {
    title: 'View Students',
    text: 'Review registered students.',
    to: '/students',
    icon: Users,
    tone: 'green',
    action: 'View Students'
  },
  {
    title: 'Enroll Course',
    text: 'Enroll a student into a course.',
    to: '/enroll',
    icon: BookOpen,
    tone: 'amber',
    action: 'Enroll Now'
  }
];

function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="hero-copy">
          <span className="section-kicker">Welcome to</span>
          <h1>Student Registration and Course Enrollment Portal</h1>
          <p>
            This portal allows you to register students, manage courses, and enroll
            students into available courses.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary btn-lg" to="/students/register">
              Get Started
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link className="btn btn-outline-primary btn-lg" to="/students">
              View Students
            </Link>
          </div>
        </div>

        <div className="education-scene" aria-hidden="true">
          <div className="scene-board">
            <div className="board-topline" />
            <div className="board-content">
              <div className="student-card card-one">
                <span />
                <strong>Student</strong>
                <small>Registration</small>
              </div>
              <div className="student-card card-two">
                <span />
                <strong>Course</strong>
                <small>Enrollment</small>
              </div>
              <div className="student-card card-three">
                <span />
                <strong>Records</strong>
                <small>Student List</small>
              </div>
            </div>
          </div>
          <div className="floating-cap">
            <GraduationCap size={82} />
          </div>
          <div className="book-model">
            <div className="book-cover" />
            <div className="book-pages" />
            <div className="book-base" />
          </div>
        </div>
      </section>

      <section className="quick-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Required Pages</span>
            <h2>Quick Access</h2>
          </div>
        </div>
        <div className="quick-grid quick-grid-three">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link className={`quick-card ${item.tone}`} key={item.title} to={item.to}>
                <span className="quick-icon">
                  <Icon size={30} aria-hidden="true" />
                </span>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
                <em>{item.action}</em>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
