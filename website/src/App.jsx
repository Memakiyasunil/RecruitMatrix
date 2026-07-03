import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import WebsiteLayout from './components/Layout';
import HomePage from './pages/HomePage';
import { ContactPage, PricingPage, AboutPage, ServicesPage, FeaturesPage, LoginRedirectPage } from './pages/OtherPages';
import { CareersPage, JobOpeningsPage, JobDetailPage, ApplyPage, ApplicationSuccessPage, TrackApplicationPage } from './pages/CareersPages';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WebsiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="features" element={<FeaturesPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="login" element={<LoginRedirectPage />} />

          {/* Careers & Job Application Flow */}
          <Route path="careers" element={<CareersPage />} />
          <Route path="careers/jobs" element={<JobOpeningsPage />} />
          <Route path="careers/jobs/:jobId" element={<JobDetailPage />} />
          <Route path="careers/apply/success" element={<ApplicationSuccessPage />} />
          <Route path="careers/apply/:jobId" element={<ApplyPage />} />
          <Route path="careers/track" element={<TrackApplicationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

