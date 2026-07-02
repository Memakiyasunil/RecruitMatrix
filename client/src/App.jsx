import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/Layout';
import LoginPage from './pages/LoginPage';
import OtpVerificationPage from './pages/OtpVerificationPage';
import UsersPage from './pages/UsersPage';
import SettingsPage from './pages/SettingsPage';
import AdminDashboard from './pages/AdminDashboard';
import ClientPage from './pages/ClientPage';

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
        <Route path="dashboard"    element={<AdminDashboard />} />
        <Route path="users"        element={<UsersPage />} />
        <Route path="clients"      element={<ClientPage />} />
        <Route path="roles"        element={<div className="text-2xl font-bold text-gray-900">Roles & Permissions</div>} />
        <Route path="settings"     element={<SettingsPage />} />
        {/* Stub routes for new sidebar items */}
        <Route path="candidates"   element={<div className="text-2xl font-bold text-gray-900">Candidates</div>} />
        <Route path="jobs"         element={<div className="text-2xl font-bold text-gray-900">Jobs</div>} />
        <Route path="interviews"   element={<div className="text-2xl font-bold text-gray-900">Interviews</div>} />
        <Route path="applications" element={<div className="text-2xl font-bold text-gray-900">Applications</div>} />
        <Route path="resumes"      element={<div className="text-2xl font-bold text-gray-900">Resumes</div>} />
        <Route path="departments"  element={<div className="text-2xl font-bold text-gray-900">Departments</div>} />
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
