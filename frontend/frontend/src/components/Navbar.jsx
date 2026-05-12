import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BrainCircuit, LogOut, User } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled glass' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="nav-container">
        <NavLink to="/" className="nav-logo interactive">
          <BrainCircuit className="logo-icon" />
          <span className="logo-text text-glow">Aditya AI-Resume</span>
        </NavLink>

        <ul className="nav-links">
          <li><NavLink to="/" className={({isActive}) => isActive ? "active-link" : ""}>Home</NavLink></li>
          <li><NavLink to="/upload" className={({isActive}) => isActive ? "active-link" : ""}>Upload Resume</NavLink></li>
          <li><NavLink to="/student-dashboard" className={({isActive}) => isActive ? "active-link" : ""}>Dashboard</NavLink></li>
          <li><NavLink to="/placement-dashboard" className={({isActive}) => isActive ? "active-link" : ""}>Placement Cell</NavLink></li>
        </ul>

        <div className="nav-actions">
          {token ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span className="text-sm font-bold flex items-center gap-2">
                <User size={16} className="text-cyan-400" />
                {user?.name?.split(' ')[0] || 'User'}
              </span>
              <button onClick={handleLogout} className="btn-primary interactive" style={{ background: 'transparent', border: '1px solid var(--color-cyan)', padding: '0.4rem 1rem' }}>
                <span className="btn-text flex items-center gap-2"><LogOut size={16} /> Logout</span>
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="btn-primary interactive" style={{ textDecoration: 'none' }}>
              <span className="btn-glow"></span>
              <span className="btn-text">Login</span>
            </NavLink>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
