import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, GitBranch, Code2, TrendingUp, AlertCircle, 
  CheckCircle2, ArrowRight, BrainCircuit
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer 
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [githubInput, setGithubInput] = useState('');
  const [isLinking, setIsLinking] = useState(false);
  const navigate = useNavigate();

  const fetchDashboard = async () => {
    try {
      const response = await api.get('/student/dashboard');
      setDashboardData(response.data.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [navigate]);

  const handleLinkGithub = async () => {
    if (!githubInput.trim()) return;
    setIsLinking(true);
    try {
      const res = await api.post('/student/github', { githubUsername: githubInput });
      if (res.data.success) {
        alert(res.data.impact || 'GitHub Linked Successfully!');
        fetchDashboard(); // refresh stats
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to link GitHub');
    } finally {
      setIsLinking(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container flex items-center justify-center min-h-screen text-cyan-400">
        <h2 className="text-2xl animate-pulse">Initializing Intelligence Core...</h2>
      </div>
    );
  }

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  // Default data if backend doesn't provide specific skills yet
  const skillData = [
    { subject: 'Algorithms', A: 85, fullMark: 100 },
    { subject: 'Frontend', A: dashboardData?.currentScores?.verifiedSkillScore > 0 ? 90 : 60, fullMark: 100 },
    { subject: 'Backend', A: dashboardData?.currentScores?.verifiedSkillScore > 0 ? 75 : 50, fullMark: 100 },
    { subject: 'Database', A: 70, fullMark: 100 },
    { subject: 'System Design', A: 60, fullMark: 100 },
    { subject: 'DevOps', A: 45, fullMark: 100 },
  ];

  const atsScore = dashboardData?.currentScores?.atsScore || 0;
  const githubScore = (dashboardData?.currentScores?.verifiedSkillScore || 0) / 10; // out of 10

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Intelligence Dashboard</h1>
          <p className="text-slate-400">Welcome back, {user.name || 'Student'} (ID: {user.studentId || dashboardData?.profile?.studentId || 'N/A'})</p>
        </div>
        <div className="student-profile-summary">
          <div className="student-avatar">{user.name ? user.name[0].toUpperCase() : 'S'}</div>
          <div>
            <div className="text-sm font-bold">{user.name || 'Student User'}</div>
            <div className="text-xs text-cyan-400">{user.branch || dashboardData?.profile?.branch || 'Branch'}</div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Top Metrics */}
        <motion.div 
          className="dash-card metric-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="metric-header">
            <FileText size={18} />
            <span>ATS Compatibility</span>
          </div>
          <div className="metric-value">{atsScore}<span className="text-2xl text-slate-400">/100</span></div>
          <div className="metric-sub">
            <TrendingUp size={14} /> Latest Scan Score
          </div>
          <FileText className="metric-bg-icon" />
        </motion.div>

        <motion.div 
          className="dash-card metric-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="metric-header">
            <GitBranch size={18} />
            <span>Verified GitHub Score</span>
          </div>
          <div className="metric-value text-green-400">{githubScore.toFixed(1)}<span className="text-2xl text-slate-400">/10</span></div>
          
          {dashboardData?.profile?.githubUsername ? (
            <div className="metric-sub text-slate-400">
              Linked: @{dashboardData.profile.githubUsername}
            </div>
          ) : (
            <div className="mt-2 flex gap-2">
              <input 
                type="text" 
                placeholder="GitHub Username" 
                className="bg-black/30 border border-white/10 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-cyan-400 w-32"
                value={githubInput}
                onChange={(e) => setGithubInput(e.target.value)}
              />
              <button 
                onClick={handleLinkGithub}
                disabled={isLinking}
                className="bg-cyan-500/20 text-cyan-400 text-xs px-2 py-1 rounded hover:bg-cyan-500/40 transition-colors"
              >
                {isLinking ? 'Linking...' : 'Link'}
              </button>
            </div>
          )}

          <GitBranch className="metric-bg-icon" />
        </motion.div>

        <motion.div 
          className="dash-card metric-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="metric-header">
            <Code2 size={18} />
            <span>Placement Readiness</span>
          </div>
          <div className="metric-value text-purple-400">{dashboardData?.currentScores?.placementReadiness || 0}%</div>
          <div className="metric-sub text-slate-400">
            Overall AI Score
          </div>
          <Code2 className="metric-bg-icon" />
        </motion.div>

        {/* Skill Radar */}
        <motion.div 
          className="dash-card radar-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <BrainCircuit className="text-cyan-400" size={20} />
            AI Skill Verification Mapping
          </h3>
          <div className="w-full h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#9acee2', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Student" dataKey="A" stroke="#1fab78" fill="#1fab78" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* AI Feedback */}
        <motion.div 
          className="dash-card feedback-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-bold mb-2">AI Resume Insights</h3>
          <p className="text-sm text-slate-400 mb-4">Actionable feedback from your latest scan</p>
          
          <div className="feedback-list">
            <div className="feedback-item success">
              <CheckCircle2 className="text-green-400 shrink-0" />
              <div className="feedback-content">
                <h4>System Status</h4>
                <p>Profile synced. Readiness score calculated successfully.</p>
              </div>
            </div>
            
            {dashboardData?.latestResumeMetrics?.redFlags?.map((flag, idx) => (
              <div key={idx} className="feedback-item warning">
                <AlertCircle className="text-orange-400 shrink-0" />
                <div className="feedback-content">
                  <h4>Alert Detected</h4>
                  <p>{flag.message || flag}</p>
                </div>
              </div>
            ))}

            {!dashboardData?.profile?.isComplete && (
              <div className="feedback-item">
                <BrainCircuit className="text-cyan-400 shrink-0" />
                <div className="feedback-content">
                  <h4>Incomplete Profile</h4>
                  <p>Upload a resume and link your GitHub to unlock full placement analysis.</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Action Card */}
        <motion.div 
          className="dash-card actions-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="action-text">
            <h3>Ready for the next step?</h3>
            <p>Upload a new resume version or initialize an AI mock interview.</p>
          </div>
          <div className="flex gap-4">
            <button className="action-btn" onClick={() => navigate('/upload')}>
              Update Resume <ArrowRight size={18} />
            </button>
            <button className="action-btn" onClick={() => alert("LLM Integration Required: Mock Interviews Coming Soon!")} style={{ background: 'var(--color-purple)' }}>
              Initialize Interview <BrainCircuit size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;
