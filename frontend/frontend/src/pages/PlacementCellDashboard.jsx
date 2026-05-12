import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Building2, TrendingUp, ShieldCheck, 
  Search, Filter, ChevronRight, FileText, CheckCircle2, AlertCircle
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import api from '../api';
import './PlacementCellDashboard.css';

const PlacementCellDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  const [stats, setStats] = useState({
    totalStudents: 0,
    readyForPlacement: 0,
    companiesOnboarded: 45, // static for now
    avgReadinessScore: 0
  });
  
  const [chartData, setChartData] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  
  const user = JSON.parse(localStorage.getItem('user') || '{"name": "Admin User"}');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, candidatesRes] = await Promise.all([
          api.get('/placement/stats'),
          api.get('/placement/top-candidates?limit=100')
        ]);

        if (statsRes.data.success) {
          const d = statsRes.data.data;
          setStats({
            totalStudents: d.totalStudents,
            readyForPlacement: d.metrics.topPerformers || Math.floor(d.totalStudents * 0.4), // approximate if topPerformers isn't 100% accurate for UI
            companiesOnboarded: 45,
            avgReadinessScore: d.metrics.averageReadinessScore
          });

          // Format domain breakdown for the chart
          const formattedChart = d.domainBreakdown.map(b => ({
            name: b.domain || 'General',
            'Highly Ready': Math.floor(b.count * (b.avgScore / 100)),
            'Needs Prep': Math.ceil(b.count * (1 - (b.avgScore / 100)))
          }));
          setChartData(formattedChart);
        }

        if (candidatesRes.data.success) {
          const formattedStudents = candidatesRes.data.data.candidates.map(s => ({
            id: s.studentId,
            name: s.name,
            branch: s.branch,
            score: s.scores.readiness,
            github: s.scores.verifiedSkills / 10,
            status: s.scores.readiness > 80 ? 'Ready' : s.profileComplete ? 'Review' : 'Incomplete'
          }));
          setStudentsList(formattedStudents);
        }
      } catch (error) {
        console.error('Failed to fetch placement data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="placement-dashboard-container flex items-center justify-center min-h-screen text-cyan-400">Loading Intelligence Core...</div>;
  }

  return (
    <div className="placement-dashboard-container">
      <div className="placement-header">
        <div>
          <h1>Placement Cell Command Center</h1>
          <p className="text-slate-400">Global Overview & Cohort Intelligence</p>
        </div>
        <div className="placement-profile-summary">
          <div className="placement-avatar">
            <ShieldCheck size={20} />
          </div>
          <div>
            <div className="text-sm font-bold">{user.name}</div>
            <div className="text-xs text-purple-400">Placement Officer</div>
          </div>
        </div>
      </div>

      <div className="placement-grid">
        {/* Metric Cards */}
        <motion.div className="p-dash-card p-metric-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="p-metric-header">
            <Users size={18} />
            <span>Total Registered Students</span>
          </div>
          <div className="p-metric-value">{stats.totalStudents}</div>
          <div className="p-metric-sub text-slate-400">
            Across All Departments
          </div>
          <Users className="p-metric-bg-icon text-purple-400" />
        </motion.div>

        <motion.div className="p-dash-card p-metric-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="p-metric-header">
            <CheckCircle2 size={18} />
            <span>Placement Ready</span>
          </div>
          <div className="p-metric-value text-green-400">{stats.readyForPlacement}</div>
          <div className="p-metric-sub text-green-400">
            <TrendingUp size={14} /> Top Performers (90+)
          </div>
          <CheckCircle2 className="p-metric-bg-icon text-green-400" />
        </motion.div>

        <motion.div className="p-dash-card p-metric-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="p-metric-header">
            <TrendingUp size={18} />
            <span>Avg AI Readiness</span>
          </div>
          <div className="p-metric-value text-cyan-400">{stats.avgReadinessScore}<span className="text-xl text-slate-400">/100</span></div>
          <div className="p-metric-sub text-cyan-400">
            Based on active profiles
          </div>
          <TrendingUp className="p-metric-bg-icon text-cyan-400" />
        </motion.div>

        <motion.div className="p-dash-card p-metric-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="p-metric-header">
            <Building2 size={18} />
            <span>Active Corporate Ties</span>
          </div>
          <div className="p-metric-value text-purple-400">{stats.companiesOnboarded}</div>
          <div className="p-metric-sub text-slate-400">
            12 upcoming drives
          </div>
          <Building2 className="p-metric-bg-icon text-purple-400" />
        </motion.div>

        {/* Chart Area */}
        <motion.div className="p-dash-card chart-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h3 className="text-lg font-bold mb-4">Readiness Distribution by Domain</h3>
          <div className="w-full h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="name" stroke="#9acee2" tick={{ fill: '#9acee2' }} />
                <YAxis stroke="#9acee2" tick={{ fill: '#9acee2' }} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: 'rgba(10,15,26,0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                <Legend />
                <Bar dataKey="Highly Ready" stackId="a" fill="#1fab78" radius={[0, 0, 4, 4]} />
                <Bar dataKey="Needs Prep" stackId="a" fill="#ff9800" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div className="p-dash-card recent-activity-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <h3 className="text-lg font-bold mb-2">Live Activity Stream</h3>
          <p className="text-xs text-slate-400 mb-2">Real-time platform events</p>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon-wrap text-cyan-400"><FileText size={16} /></div>
              <div className="activity-content">
                <h4>System Update</h4>
                <p>New mock data seeded by Placement Officer.</p>
              </div>
            </div>
            {studentsList.slice(0, 3).map((s, idx) => (
              <div className="activity-item" key={idx}>
                <div className="activity-icon-wrap text-purple-400"><ShieldCheck size={16} /></div>
                <div className="activity-content">
                  <h4>Profile Registered</h4>
                  <p>{s.name} ({s.branch}) account created. Score: {s.score}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Student Table */}
        <motion.div className="p-dash-card students-table-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Student Intelligence Directory</h3>
            <div className="flex gap-2">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search student ID or name..." 
                  className="bg-black/30 border border-white/10 rounded-full py-1.5 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="bg-white/5 border border-white/10 rounded-full p-2 hover:bg-white/10 transition-colors">
                <Filter size={16} className="text-slate-300" />
              </button>
            </div>
          </div>
          
          <table className="cyber-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Branch</th>
                <th>AI Score</th>
                <th>GitHub</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {studentsList
                .filter(s => (s.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || (s.id || '').toLowerCase().includes(searchTerm.toLowerCase()))
                .map((student, idx) => (
                <tr key={idx}>
                  <td className="font-mono text-cyan-400">{student.id}</td>
                  <td className="font-medium">{student.name}</td>
                  <td>{student.branch}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full" 
                          style={{ 
                            width: `${student.score}%`, 
                            backgroundColor: student.score > 80 ? '#1fab78' : student.score > 60 ? '#ff9800' : '#f44336' 
                          }}
                        />
                      </div>
                      <span className="text-xs">{student.score}</span>
                    </div>
                  </td>
                  <td>{student.github > 0 ? student.github.toFixed(1) : 'N/A'}</td>
                  <td>
                    <span className={`status-badge status-${student.status.toLowerCase()}`}>
                      {student.status}
                    </span>
                  </td>
                  <td>
                    <button className="text-slate-400 hover:text-cyan-400 transition-colors">
                      <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

      </div>
    </div>
  );
};

export default PlacementCellDashboard;
