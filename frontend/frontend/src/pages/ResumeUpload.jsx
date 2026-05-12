import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, Cpu, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './ResumeUpload.css';

const ResumeUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dataStream, setDataStream] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      startScanningProcess(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      startScanningProcess(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const startScanningProcess = async (file) => {
    setIsScanning(true);
    let currentProgress = 0;
    
    // Simulate data extraction logs visually
    const logs = [
      `[INGEST] File detected: ${file.name}`,
      "[DECRYPT] Bypassing formatting nodes...",
      "[EXTRACT] Identifying contact information...",
      "[ANALYZE] Running skill extraction NLP...",
      "[VERIFY] Cross-referencing GitHub handlers...",
      "[SCORE] Calculating ATS compatibility...",
      "[COMPILE] Building placement profile..."
    ];

    let logIndex = 0;

    const interval = setInterval(() => {
      currentProgress += Math.random() * 5 + 2;
      if (currentProgress > 90) currentProgress = 90; // Stall at 90% until backend returns
      setProgress(currentProgress);

      if (logIndex < logs.length && currentProgress > (logIndex * 12)) {
        setDataStream(prev => [...prev, logs[logIndex]]);
        logIndex++;
      }
    }, 200);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('targetRole', 'FSD'); // Default role

      await api.post('/student/resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      clearInterval(interval);
      setProgress(100);

      setTimeout(() => {
        navigate('/student-dashboard');
      }, 1500);
      
    } catch (error) {
      clearInterval(interval);
      console.error('Upload error:', error);
      alert(error.response?.data?.message || 'Resume upload failed. Make sure you are logged in and profile is complete.');
      setIsScanning(false);
      setProgress(0);
      setDataStream([]);
    }
  };

  return (
    <div className="upload-page-container">
      <motion.div 
        className="upload-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="upload-header">
          <h1>Data Ingestion Portal</h1>
          <p>Uplink your resume to the AI Core for immediate placement analysis</p>
        </div>

        <form onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
          <input 
            ref={inputRef} 
            type="file" 
            className="file-input" 
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
          />
          
          <div 
            className={`holographic-dropzone ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={!isScanning ? onButtonClick : undefined}
          >
            <AnimatePresence>
              {!isScanning ? (
                <motion.div 
                  className="dropzone-content"
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <div className="icon-ring">
                    <UploadCloud size={48} />
                    <div className="pulse-ring"></div>
                  </div>
                  <div className="drop-text">
                    <h3>Initialize Uplink</h3>
                    <p>Drag & Drop your resume or click to browse</p>
                    <p className="text-xs text-slate-400 mt-2">Supports PDF, DOCX (Max 5MB)</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  className="scanning-sequence"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div 
                    className="laser-scanner"
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {progress === 100 ? (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-green-400 mb-4"
                    >
                      <CheckCircle size={64} />
                    </motion.div>
                  ) : (
                    <Cpu size={48} className="text-cyan-400 mb-4 animate-pulse" />
                  )}
                  
                  <h3 className="text-xl font-bold text-white mb-2">
                    {progress === 100 ? 'Analysis Complete' : 'Parsing Resume Data...'}
                  </h3>
                  
                  <div className="progress-container">
                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                  </div>

                  <div className="data-stream">
                    {dataStream.map((log, index) => (
                      <motion.div 
                        key={index} 
                        className="data-line"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        {log}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ResumeUpload;
