import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Activity } from 'lucide-react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="badge"
          >
            <Activity className="badge-icon" />
            <span>Aditya University OS v2.0</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-title text-glow"
          >
            Aditya AI-Resume
          </motion.h1>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hero-subtitle text-gradient"
          >
            AI-Powered Placement Intelligence Platform
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="hero-description"
          >
            Transforming student potential into verified industry-ready talent using AI-driven resume analysis, GitHub verification, and intelligent placement ranking.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="hero-buttons"
          >
            <button className="btn-primary large interactive">
              Get Started <ArrowRight className="btn-icon" />
            </button>
            <button className="btn-secondary large interactive">
              Explore Dashboard
            </button>
          </motion.div>
        </div>
        
        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, x: 50, rotateY: -15 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1.2, delay: 0.5, type: 'spring' }}
        >
          {/* 3D floating dashboard preview mockup */}
          <div className="dashboard-mockup glass">
            <div className="mockup-header">
              <div className="mockup-dots">
                <span></span><span></span><span></span>
              </div>
              <div className="mockup-title">Intelligence Overview</div>
            </div>
            <div className="mockup-body">
              <div className="mockup-chart pulse-anim"></div>
              <div className="mockup-stats">
                <div className="stat-card glass interactive">
                  <div className="stat-value text-gradient">98%</div>
                  <div className="stat-label">Verified Skill Score</div>
                </div>
                <div className="stat-card glass interactive">
                  <div className="stat-value text-gradient">95/100</div>
                  <div className="stat-label">ATS Match</div>
                </div>
              </div>
              <div className="mockup-scanning">
                <div className="scanning-line"></div>
                <div className="scanning-text">Analyzing GitHub Commits...</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
