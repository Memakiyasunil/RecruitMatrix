import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/Layout';
import LoginPage from './pages/LoginPage';
import OtpVerificationPage from './pages/OtpVerificationPage';

// Existing pages
import AdminDashboard from './pages/AdminDashboard';
import UsersPage from './pages/UsersPage';
import ClientPage from './pages/ClientPage';
import SettingsPage from './pages/SettingsPage';

// Stub pages for all new modules
import {
  RequisitionsPage, ApprovalsPage, AllocationsPage, CandidatesPage,
  TaggingPage, ScreeningPage, ShortlistingPage, InterviewsPage,
  SelectionPage, OffersPage, OfferAcceptancePage, JoiningPage,
  DocumentsPage, TasksPage, AttendancePage, ReportsPage,
  RolesPage, DepartmentsPage, DesignationsPage, AuditPage
} from './pages/StubPages';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login"      element={<LoginPage />} />
      <Route path="/verify-otp" element={<OtpVerificationPage />} />

      {/* Redirect root to admin dashboard */}
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />

        {/* Core Recruitment */}
        <Route path="requisitions" element={<RequisitionsPage />} />
        <Route path="approvals" element={<ApprovalsPage />} />
        <Route path="allocations" element={<AllocationsPage />} />
        <Route path="candidates" element={<CandidatesPage />} />
        <Route path="tagging" element={<TaggingPage />} />
        <Route path="screening" element={<ScreeningPage />} />
        <Route path="shortlisting" element={<ShortlistingPage />} />
        <Route path="interviews" element={<InterviewsPage />} />
        <Route path="selection" element={<SelectionPage />} />
        <Route path="offers" element={<OffersPage />} />
        <Route path="offer-acceptance" element={<OfferAcceptancePage />} />
        <Route path="joining" element={<JoiningPage />} />

        {/* Operations */}
        <Route path="clients" element={<ClientPage />} />
        <Route path="documents" element={<DocumentsPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="reports" element={<ReportsPage />} />

        {/* System & Admin */}
        <Route path="users" element={<UsersPage />} />
        <Route path="roles" element={<RolesPage />} />
        <Route path="departments" element={<DepartmentsPage />} />
        <Route path="designations" element={<DesignationsPage />} />
        <Route path="audit" element={<AuditPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
