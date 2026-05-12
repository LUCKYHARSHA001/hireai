import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import PlacementCellDashboard from './pages/PlacementCellDashboard.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ResumeUpload from './pages/ResumeUpload.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import AnimatedBackground from './components/AnimatedBackground.jsx';
import Navbar from './components/Navbar.jsx';

function App() {
  return (
    <>
      <AnimatedBackground />
      <CustomCursor />
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<ResumeUpload />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/placement-dashboard" element={<PlacementCellDashboard />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
