import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import WebsiteLayout from './components/Layout';
import HomePage from './pages/HomePage';
import { ContactPage, PricingPage, AboutPage, ServicesPage, FeaturesPage, LoginRedirectPage } from './pages/OtherPages';

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
