import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/Layout';
import { LayoutDashboard, Users, UserCog, Settings } from 'lucide-react';
import LoginPage from './pages/LoginPage';

// Placeholder Pages
const AdminDashboard = () => <div className="text-2xl font-bold">Admin Dashboard</div>;
const UsersPage = () => <div className="text-2xl font-bold">Users Management</div>;

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function AppRoutes() {
  const adminMenuItems = [
    { label: 'Overview', type: 'divider' },
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Masters', type: 'divider' },
    { label: 'User Management', path: '/admin/users', icon: Users },
    { label: 'Role & Permission', path: '/admin/roles', icon: UserCog },
    { label: 'System', type: 'divider' },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      {/* Redirect root to admin dashboard for now */}
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      
      {/* Admin Routes */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <Layout menuItems={adminMenuItems} />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="roles" element={<div className="text-2xl font-bold">Roles</div>} />
        <Route path="settings" element={<div className="text-2xl font-bold">Settings</div>} />
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
