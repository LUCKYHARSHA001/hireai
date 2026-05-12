import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ChevronUp } from 'lucide-react';
import './PlacementRanking.css';

const domains = ['All Domains', 'Full Stack', 'Machine Learning', 'Cybersecurity'];

const dummyStudents = [
  { id: 1, name: 'Alex Thompson', domain: 'Full Stack', score: 98.4, github: 99, ats: 96, avatar: 'AT' },
  { id: 2, name: 'Priya Sharma', domain: 'Machine Learning', score: 97.8, github: 96, ats: 98, avatar: 'PS' },
  { id: 3, name: 'David Chen', domain: 'Cybersecurity', score: 96.5, github: 95, ats: 95, avatar: 'DC' },
  { id: 4, name: 'Sarah Jenkins', domain: 'Full Stack', score: 95.9, github: 94, ats: 97, avatar: 'SJ' },
  { id: 5, name: 'Michael Ross', domain: 'Machine Learning', score: 95.2, github: 92, ats: 96, avatar: 'MR' }
];

const PlacementRanking = () => {
  const [activeDomain, setActiveDomain] = useState('All Domains');

  const filteredStudents = activeDomain === 'All Domains' 
    ? dummyStudents 
    : dummyStudents.filter(s => s.domain === activeDomain);

  return (
    <section className="ranking-section" id="rankings">
      <div className="section-container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="badge centered">
            <Trophy className="badge-icon" />
            <span>Leaderboard</span>
          </div>
          <h2 className="section-title text-glow mt-4">Top Placement Candidates</h2>
          <p className="section-subtitle">Real-time domain-wise rankings based on verified skill scores, contest ratings, and ATS compatibility.</p>
        </motion.div>

        <motion.div 
          className="domain-filters"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {domains.map(domain => (
            <button 
              key={domain}
              className={`filter-btn interactive ${activeDomain === domain ? 'active' : ''}`}
              onClick={() => setActiveDomain(domain)}
            >
              {domain}
            </button>
          ))}
        </motion.div>

        <div className="leaderboard">
          <div className="leaderboard-header">
            <div className="col-rank">Rank</div>
            <div className="col-student">Student</div>
            <div className="col-domain">Domain</div>
            <div className="col-scores">Verified Score</div>
          </div>
          
          <div className="leaderboard-list">
            <AnimatePresence mode="popLayout">
              {filteredStudents.map((student, index) => (
                <motion.div 
                  key={student.id}
                  className="student-row glass interactive"
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="col-rank">
                    {index === 0 ? <Trophy className="rank-icon gold" /> : 
                     index === 1 ? <Trophy className="rank-icon silver" /> : 
                     index === 2 ? <Trophy className="rank-icon bronze" /> : 
                     <span className="rank-num">#{index + 1}</span>}
                  </div>
                  
                  <div className="col-student">
                    <div className="avatar">{student.avatar}</div>
                    <div className="student-info">
                      <div className="student-name">{student.name}</div>
                      <div className="student-trend"><ChevronUp size={12} className="text-accent" /> Rising</div>
                    </div>
                  </div>
                  
                  <div className="col-domain">
                    <span className="domain-tag">{student.domain}</span>
                  </div>
                  
                  <div className="col-scores">
                    <div className="score-main text-gradient">{student.score}</div>
                    <div className="score-breakdown">
                      <span>GH: {student.github}</span>
                      <span>ATS: {student.ats}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlacementRanking;
