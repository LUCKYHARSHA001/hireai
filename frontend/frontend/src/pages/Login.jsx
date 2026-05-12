import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Lock, Mail, Terminal, CheckCircle2, ScanFace, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './Login.css';

const mockStatusFeed = [
  "Establishing secure connection to AI core...",
  "Verifying identity matrix...",
  "Loading global placement data...",
  "Initializing skill verification engine..."
];

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(0);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    // Simulate login status updates visually
    let statusIndex = 0;
    const interval = setInterval(() => {
      statusIndex++;
      if (statusIndex < mockStatusFeed.length) {
        setCurrentStatus(statusIndex);
      }
    }, 300);

    try {
      const response = await api.post('/auth/login', { email, password });
      clearInterval(interval);
      setCurrentStatus(mockStatusFeed.length - 1);

      if (response.data.success) {
        localStorage.setItem('accessToken', response.data.data.tokens.accessToken);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        
        setTimeout(() => {
          if (response.data.data.user.role === 'placement') {
            navigate('/placement-dashboard');
          } else {
            navigate('/student-dashboard');
          }
        }, 600);
      }
    } catch (error) {
      clearInterval(interval);
      console.error('Login error:', error);
      alert(error.response?.data?.message || 'Authentication failed. Please check credentials.');
      setIsLoggingIn(false);
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
            <p>Placement Intelligence Ecosystem</p>
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
        <div className="login-form-panel">
          <motion.div 
            className="form-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ScanFace size={48} className="mx-auto mb-4 text-cyan-400" />
            <h1>Identity Verification</h1>
            <p>Access your personalized placement intelligence</p>
          </motion.div>

          <form className="cyber-form" onSubmit={handleLogin}>
            <motion.div 
              className="input-group"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <label htmlFor="password">
                <Lock className="input-icon" />
                Secure Passkey
              </label>
              <div className="input-wrapper">
                <input 
                  type="password" 
                  id="password" 
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <div className="input-focus-line"></div>
              </div>
              <a href="#" className="forgot-password">Lost Authentication?</a>
            </motion.div>

            <motion.button 
              type="submit" 
              className="cyber-button mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              disabled={isLoggingIn}
            >
              {isLoggingIn ? 'Authenticating...' : 'Initialize Session'}
              {!isLoggingIn && <Fingerprint size={20} />}
              <div className="btn-glitch"></div>
            </motion.button>
          </form>

          <motion.div 
            className="sso-divider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <span>OR BIOMETRIC UPLINK</span>
          </motion.div>

          <motion.button 
            type="button"
            className="sso-button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" width="20" height="20" />
            Sign in with Google Workspace
          </motion.button>

          <motion.p 
            className="auth-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Unregistered Entity? <a href="/register" className="text-cyan-400 hover:text-white transition-colors">Request clearance</a>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
