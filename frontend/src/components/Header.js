import { GraduationCap } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/students', label: 'Students' },
  { to: '/enroll', label: 'Enroll Course' },
  { to: '/enrollments', label: 'Enrollments' }
];

function Header() {
  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid app-container">
          <NavLink className="navbar-brand brand-mark" to="/">
            <GraduationCap size={26} aria-hidden="true" />
            <span>Student Portal</span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavigation"
            aria-controls="mainNavigation"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="mainNavigation">
            <div className="navbar-nav ms-auto">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
