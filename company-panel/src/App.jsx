import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

import CompanyLayout from './components/Layout';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import DocumentsPage from './pages/DocumentsPage';
import NotificationsPage from './pages/NotificationsPage';
import MyRequisitionsPage from './pages/MyRequisitionsPage';

// Full hiring workflow
import {
  FullCandidateProgressPage,
  FullCompanyInterviewPage,
  FullSelectedCandidatesPage,
  FullRejectedCandidatesPage,
  FullOfferStatusPage,
  FullJoinedCandidatesPage
} from './pages/CompanyHiringPages';

// Full operations pages
import {
  FullEmployeeManagementPage,
  FullAttendancePage,
  FullTaskManagementPage,
  FullShortlistReviewPage,
  FullCreateRequisitionPage,
  FullReportsPage,
  FullProfilePage
} from './pages/CompanyOperationsPages';

import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" replace />;
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

            {/* Talent Requisition */}
            <Route path="requisitions" element={<MyRequisitionsPage />} />
            <Route path="requisitions/create" element={<FullCreateRequisitionPage />} />

            {/* Hiring Workflow */}
            <Route path="candidates/progress" element={<FullCandidateProgressPage />} />
            <Route path="candidates/shortlist" element={<FullShortlistReviewPage />} />
            <Route path="interviews" element={<FullCompanyInterviewPage />} />
            <Route path="selected" element={<FullSelectedCandidatesPage />} />
            <Route path="rejected" element={<FullRejectedCandidatesPage />} />
            <Route path="offers" element={<FullOfferStatusPage />} />
            <Route path="joinings" element={<FullJoinedCandidatesPage />} />

            {/* Operations */}
            <Route path="employees" element={<FullEmployeeManagementPage />} />
            <Route path="attendance" element={<FullAttendancePage />} />
            <Route path="tasks" element={<FullTaskManagementPage />} />
            <Route path="reports" element={<FullReportsPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="profile" element={<FullProfilePage />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
