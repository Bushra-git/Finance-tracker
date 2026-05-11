import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const getInitials = (username) => {
    return username?.charAt(0).toUpperCase() || 'U';
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold">
              ₹
            </div>
            <span className="text-xl font-bold hidden md:inline">Finance Tracker</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/home"
              className={`pb-2 transition ${
                isActive('/home')
                  ? 'border-b-2 border-emerald-500 text-emerald-400'
                  : 'hover:text-emerald-400'
              }`}
            >
              Home
            </Link>
            <Link
              to="/profile"
              className={`pb-2 transition ${
                isActive('/profile')
                  ? 'border-b-2 border-emerald-500 text-emerald-400'
                  : 'hover:text-emerald-400'
              }`}
            >
              Profile
            </Link>
          </div>

          {/* User Section */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center font-bold">
                {getInitials(user?.username)}
              </div>
              <span className="text-sm">{user?.username}</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-rose-500 hover:bg-rose-600 rounded-lg transition"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="/home"
              className={`block px-4 py-2 rounded transition ${
                isActive('/home') ? 'bg-emerald-500' : 'hover:bg-slate-700'
              }`}
            >
              Home
            </Link>
            <Link
              to="/profile"
              className={`block px-4 py-2 rounded transition ${
                isActive('/profile') ? 'bg-emerald-500' : 'hover:bg-slate-700'
              }`}
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 bg-rose-500 hover:bg-rose-600 rounded transition text-left"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
