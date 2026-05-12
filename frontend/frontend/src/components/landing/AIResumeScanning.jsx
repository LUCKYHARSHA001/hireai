import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, AlertTriangle, Sparkles } from 'lucide-react';
import './AIResumeScanning.css';

const AIResumeScanning = () => {
  return (
    <section className="resume-section" id="features">
      <div className="section-container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title text-glow">Real-Time AI Resume Analysis</h2>
          <p className="section-subtitle">Our proprietary engine scans, scores, and optimizes resumes instantly, exposing weaknesses and generating ATS-friendly alternatives.</p>
        </motion.div>

        <div className="resume-grid">
          <motion.div 
            className="resume-upload-card glass"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="upload-header">
              <FileText className="upload-icon" />
              <h3>student_resume_vfinal.pdf</h3>
              <span className="status-badge processing">Analyzing</span>
            </div>
            
            <div className="resume-document">
              <div className="doc-line w-80"></div>
              <div className="doc-line w-60"></div>
              <div className="doc-line w-90 highlight"></div>
              <div className="doc-line w-40"></div>
              <div className="doc-line w-70"></div>
              <div className="doc-line w-80 highlight error"></div>
              
              <div className="ai-scanner"></div>
            </div>
            
            <div className="optimization-suggestions">
              <div className="suggestion-item">
                <CheckCircle className="icon-success" />
                <span>Strong action verbs detected (7)</span>
              </div>
              <div className="suggestion-item">
                <AlertTriangle className="icon-warning" />
                <span>Quantifiable achievements missing in Experience</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="resume-metrics"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="metric-card glass interactive">
              <div className="metric-header">
                <h4>ATS Compatibility Score</h4>
                <Sparkles className="metric-icon" />
              </div>
              <div className="progress-container">
                <div className="progress-value text-gradient">84%</div>
                <div className="progress-bar-bg">
                  <motion.div 
                    className="progress-bar-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: '84%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                  ></motion.div>
                </div>
              </div>
            </div>

            <div className="metric-card glass interactive">
              <div className="metric-header">
                <h4>Keyword Match (Software Engineer)</h4>
              </div>
              <div className="keywords-grid">
                <span className="keyword matched">React.js</span>
                <span className="keyword matched">Node.js</span>
                <span className="keyword matched">Python</span>
                <span className="keyword missing">Docker</span>
                <span className="keyword missing">AWS</span>
                <span className="keyword matched">SQL</span>
              </div>
            </div>
            
            <button className="btn-primary interactive w-full mt-4">
              <span className="btn-glow"></span>
              <span className="btn-text">Auto-Optimize Resume</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIResumeScanning;
