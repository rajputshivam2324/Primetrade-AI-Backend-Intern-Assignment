import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiOutlineLogout, HiOutlineShieldCheck, HiOutlineViewGrid } from 'react-icons/hi';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard">
          <span>TaskFlow</span>
        </Link>
      </div>

      <div className="navbar-info">
        <span className="navbar-greeting">Hello, <strong>{user.name}</strong></span>
        <span className={`role-badge ${user.role}`}>
          {user.role === 'admin' ? <HiOutlineShieldCheck /> : <HiOutlineViewGrid />}
          {user.role}
        </span>
      </div>

      <div className="navbar-actions">
        {isAdmin && (
          <Link to="/admin" className="nav-link">
            <HiOutlineShieldCheck />
            Admin
          </Link>
        )}
        <button onClick={handleLogout} className="btn-logout">
          <HiOutlineLogout />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
