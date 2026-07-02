import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

import CompanyLayout from './components/Layout';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import CreateRequisitionPage from './pages/CreateRequisitionPage';
import MyRequisitionsPage from './pages/MyRequisitionsPage';
import CandidateProgressPage from './pages/CandidateProgressPage';
import ShortlistReviewPage from './pages/ShortlistReviewPage';
import InterviewSchedulePage from './pages/InterviewSchedulePage';
import { SelectedCandidatesPage, OfferStatusPage, JoinedCandidatesPage } from './pages/HiringPages';
import ReportsPage from './pages/ReportsPage';
import DocumentsPage from './pages/DocumentsPage';
import NotificationsPage from './pages/NotificationsPage';
import ProfilePage from './pages/ProfilePage';
import EmployeeManagementPage from './pages/EmployeeManagementPage';
import TaskManagementPage from './pages/TaskManagementPage';

import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />

          {/* Company Panel — Protected */}
          <Route path="/" element={<ProtectedRoute><CompanyLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="requisitions" element={<MyRequisitionsPage />} />
            <Route path="requisitions/create" element={<CreateRequisitionPage />} />
            <Route path="candidates/progress" element={<CandidateProgressPage />} />
            <Route path="candidates/shortlist" element={<ShortlistReviewPage />} />
            <Route path="interviews" element={<InterviewSchedulePage />} />
            <Route path="selected" element={<SelectedCandidatesPage />} />
            <Route path="offers" element={<OfferStatusPage />} />
            <Route path="joinings" element={<JoinedCandidatesPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="employees" element={<EmployeeManagementPage />} />
            <Route path="tasks" element={<TaskManagementPage />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
