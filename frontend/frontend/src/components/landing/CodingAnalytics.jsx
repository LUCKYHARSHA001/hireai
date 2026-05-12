import React from 'react';
import { motion } from 'framer-motion';
import { Code2, BarChart2, Star } from 'lucide-react';
import './CodingAnalytics.css';

const CodingAnalytics = () => {
  return (
    <section className="coding-section">
      <div className="section-container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="badge centered">
            <Code2 className="badge-icon" />
            <span>Coding Profiles</span>
          </div>
          <h2 className="section-title text-glow mt-4">Unified Coding Analytics</h2>
          <p className="section-subtitle">We aggregate your performance across LeetCode, HackerRank, and CodeChef to build a comprehensive problem-solving profile.</p>
        </motion.div>

        <div className="coding-dashboard">
          <div className="coding-platforms">
            <motion.div 
              className="platform-card leetcode interactive glass"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="platform-header">
                <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png" alt="LeetCode" className="platform-logo inverted" />
                <span className="platform-name">LeetCode</span>
              </div>
              <div className="platform-stats">
                <div className="stat-circle">
                  <svg viewBox="0 0 36 36" className="circular-chart orange">
                    <path className="circle-bg"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path className="circle"
                      strokeDasharray="75, 100"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="circle-text">450+</div>
                </div>
                <div className="stat-details">
                  <div className="detail-item"><span className="dot easy"></span> 200 Easy</div>
                  <div className="detail-item"><span className="dot medium"></span> 200 Medium</div>
                  <div className="detail-item"><span className="dot hard"></span> 50 Hard</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="platform-card hackerrank interactive glass"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="platform-header">
                <div className="hr-logo">H</div>
                <span className="platform-name">HackerRank</span>
              </div>
              <div className="platform-stats hr-stats">
                <div className="badge-grid">
                  <div className="hr-badge gold-badge">
                    <Star size={16} fill="currentColor" />
                    <span>5 Star Problem Solving</span>
                  </div>
                  <div className="hr-badge silver-badge">
                    <Star size={16} fill="currentColor" />
                    <span>4 Star Python</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="skill-graph-container glass"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="graph-header">
              <h3>Problem Solving Trajectory</h3>
              <BarChart2 className="text-secondary" />
            </div>
            <div className="mock-graph">
              <svg viewBox="0 0 400 150" className="chart-svg">
                <defs>
                  <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(59, 163, 255, 0.4)" />
                    <stop offset="100%" stopColor="rgba(59, 163, 255, 0)" />
                  </linearGradient>
                </defs>
                <path className="line-area" d="M0,150 L0,120 Q50,100 100,110 T200,80 T300,50 T400,20 L400,150 Z" fill="url(#gradientArea)" />
                <path className="line-path" d="M0,120 Q50,100 100,110 T200,80 T300,50 T400,20" fill="none" stroke="var(--glow-blue)" strokeWidth="3" />
                <circle cx="100" cy="110" r="4" fill="var(--glow-blue)" className="data-point pulse" />
                <circle cx="200" cy="80" r="4" fill="var(--glow-blue)" className="data-point pulse" />
                <circle cx="300" cy="50" r="4" fill="var(--glow-blue)" className="data-point pulse" />
                <circle cx="400" cy="20" r="6" fill="#fff" className="data-point pulse" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CodingAnalytics;
