import React from 'react';
import HeroSection from '../components/landing/HeroSection';
import AIResumeScanning from '../components/landing/AIResumeScanning';
import GitHubVerification from '../components/landing/GitHubVerification';
import PlacementRanking from '../components/landing/PlacementRanking';
import CodingAnalytics from '../components/landing/CodingAnalytics';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <HeroSection />
      <AIResumeScanning />
      <GitHubVerification />
      <PlacementRanking />
      <CodingAnalytics />
      {/* Additional sections will be added here */}
    </div>
  );
};

export default LandingPage;
