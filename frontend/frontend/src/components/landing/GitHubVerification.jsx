import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, GitCommit, GitPullRequest, GitMerge } from 'lucide-react';
import './GitHubVerification.css';

const GitHubVerification = () => {
  const intensities = useMemo(() => {
    return Array.from({ length: 42 }).map(() => Math.floor(Math.random() * 5));
  }, []);

  return (
    <section className="github-section" id="verification">
      <div className="section-container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title text-glow">GitHub Verification Engine</h2>
          <p className="section-subtitle">We don't just trust resumes. Our AI analyzes your actual code, commit history, and pull requests to calculate a verified, tamper-proof skill score.</p>
        </motion.div>

        <div className="github-content">
          <div className="github-visuals">
            <motion.div 
              className="neural-graph glass"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="neural-header">
                <GitBranch className="github-icon" />
                <span>Analyzing Repository: <span className="highlight-repo">aditya-university-os</span></span>
              </div>
              
              <div className="neural-network-animation">
                <div className="node center pulse-glow">
                  <span className="node-text">AI Core</span>
                </div>
                
                {/* Simulated commit nodes */}
                <div className="node commit n1"><GitCommit size={14} /></div>
                <div className="node commit n2"><GitCommit size={14} /></div>
                <div className="node commit n3"><GitPullRequest size={14} /></div>
                <div className="node commit n4"><GitMerge size={14} /></div>
                <div className="node commit n5"><GitCommit size={14} /></div>
                
                {/* Connecting lines are handled in CSS */}
              </div>
              
              <div className="commit-heatmap">
                {intensities.map((intensity, i) => (
                  <motion.div 
                    key={i}
                    className={`heatmap-cell intensity-${intensity}`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.02, duration: 0.3 }}
                  ></motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="github-stats">
            <motion.div 
              className="stat-box glass interactive"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="stat-label">Verified Skill Score</div>
              <div className="stat-value text-gradient score-number">94.2</div>
              <div className="stat-sub">Top 5% in University</div>
            </motion.div>
            
            <motion.div 
              className="stat-box glass interactive"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="stat-label">Code Quality</div>
              <div className="quality-bar">
                <div className="quality-fill"></div>
              </div>
              <div className="stat-sub">Clean code architecture detected</div>
            </motion.div>
            
            <motion.div 
              className="stat-box glass interactive"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="stat-label">Tech Stack Detected</div>
              <div className="tech-stack-tags">
                <span className="tag">React</span>
                <span className="tag">TypeScript</span>
                <span className="tag">Node.js</span>
                <span className="tag">GraphQL</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubVerification;
