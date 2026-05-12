import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Lock, Mail, Terminal, CheckCircle2, ScanFace, User, Building2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import './Login.css';

const mockStatusFeed = [
  "Initializing registration matrix...",
  "Encrypting biometric markers...",
  "Validating university credentials...",
  "Provisioning placement profile..."
];

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    studentId: '',
    branch: 'CSE',
  });
  
  const [isRegistering, setIsRegistering] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(0);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsRegistering(true);
    
    // Simulate registration status updates visually
    let statusIndex = 0;
    const interval = setInterval(() => {
      statusIndex++;
      if (statusIndex < mockStatusFeed.length) {
        setCurrentStatus(statusIndex);
      }
    }, 300);

    try {
      // Backend expects role to be explicitly 'student' or 'placement'. Defaulting to student here.
      const payload = {
        ...formData,
        role: 'student'
      };

      const response = await api.post('/auth/register', payload);
      clearInterval(interval);
      setCurrentStatus(mockStatusFeed.length - 1);

      if (response.data.success) {
        localStorage.setItem('accessToken', response.data.data.tokens.accessToken);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        
        setTimeout(() => {
          navigate('/student-dashboard');
        }, 600);
      }
    } catch (error) {
      clearInterval(interval);
      console.error('Registration error:', error);
      alert(error.response?.data?.message || 'Registration failed. Please try again.');
      setIsRegistering(false);
      setCurrentStatus(0);
    }
  };

  return (
    <div className="login-page-container">
      <motion.div 
        className="login-grid"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Left Side: Cinematic Visuals */}
        <div className="login-visual-panel">
          <div className="network-animation"></div>
          
          <motion.div 
            className="visual-header"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2>Aditya AI-Core</h2>
            <p>New Entity Registration</p>
          </motion.div>

          <div className="status-feed">
            <AnimatePresence>
              {mockStatusFeed.slice(0, currentStatus + 1).map((status, idx) => (
                <motion.div 
                  key={idx}
                  className="status-item"
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: 'auto' }}
                  transition={{ type: 'spring', bounce: 0.4 }}
                >
                  <Terminal className="status-icon" size={18} />
                  <span>{status}</span>
                  {idx < currentStatus && <CheckCircle2 size={16} className="text-green-400 ml-auto" />}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Glassmorphic Form */}
        <div className="login-form-panel" style={{ overflowY: 'auto', maxHeight: '90vh' }}>
          <motion.div 
            className="form-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ScanFace size={48} className="mx-auto mb-4 text-cyan-400" />
            <h1>Profile Provisioning</h1>
            <p>Create your placement intelligence profile</p>
          </motion.div>

          <form className="cyber-form" onSubmit={handleRegister}>
            <motion.div 
              className="input-group"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label htmlFor="name">
                <User className="input-icon" />
                Full Name
              </label>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  id="name" 
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
                <div className="input-focus-line"></div>
              </div>
            </motion.div>

            <motion.div 
              className="input-group"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label htmlFor="studentId">
                <Terminal className="input-icon" />
                Student ID
              </label>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  id="studentId" 
                  placeholder="21MH1A0501"
                  value={formData.studentId}
                  onChange={handleChange}
                  required 
                />
                <div className="input-focus-line"></div>
              </div>
            </motion.div>

            <motion.div 
              className="input-group"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label htmlFor="branch">
                <Building2 className="input-icon" />
                Branch
              </label>
              <div className="input-wrapper">
                <select 
                  id="branch" 
                  value={formData.branch}
                  onChange={handleChange}
                  className="w-full bg-transparent text-white border-none focus:outline-none"
                  style={{ appearance: 'none', padding: '12px 12px 12px 40px' }}
                >
                  <option value="CSE" className="bg-slate-900 text-white">CSE</option>
                  <option value="IT" className="bg-slate-900 text-white">IT</option>
                  <option value="ECE" className="bg-slate-900 text-white">ECE</option>
                  <option value="ME" className="bg-slate-900 text-white">ME</option>
                  <option value="Civil" className="bg-slate-900 text-white">Civil</option>
                </select>
                <div className="input-focus-line"></div>
              </div>
            </motion.div>

            <motion.div 
              className="input-group"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label htmlFor="email">
                <Mail className="input-icon" />
                University Email Address
              </label>
              <div className="input-wrapper">
                <input 
                  type="email" 
                  id="email" 
                  placeholder="student@aditya.ac.in"
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
                <div className="input-focus-line"></div>
              </div>
            </motion.div>

            <motion.div 
              className="input-group"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <label htmlFor="password">
                <Lock className="input-icon" />
                Secure Passkey
              </label>
              <div className="input-wrapper">
                <input 
                  type="password" 
                  id="password" 
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required 
                  minLength={8}
                />
                <div className="input-focus-line"></div>
              </div>
            </motion.div>

            <motion.button 
              type="submit" 
              className="cyber-button mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              disabled={isRegistering}
            >
              {isRegistering ? 'Provisioning...' : 'Initialize Profile'}
              {!isRegistering && <Fingerprint size={20} />}
              <div className="btn-glitch"></div>
            </motion.button>
          </form>

          <motion.p 
            className="auth-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Already an entity? <Link to="/login" className="text-cyan-400 hover:text-white transition-colors">Authenticate here</Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
