import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 p-6 flex justify-between items-center text-white">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="bg-white text-blue-600 px-4 py-2 rounded font-semibold hover:bg-blue-50"
          >
            Logout
          </button>
        </div>
        
        <div className="p-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Welcome, {currentUser?.displayName || 'User'}!</h2>
          <p className="text-gray-600 mb-8">This is the central hub for TalentFlow ERP CRM.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 shadow-sm">
              <h3 className="text-lg font-bold text-blue-800 mb-2">Users</h3>
              <p className="text-3xl font-extrabold text-blue-600">0</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border border-green-100 shadow-sm">
              <h3 className="text-lg font-bold text-green-800 mb-2">Active Candidates</h3>
              <p className="text-3xl font-extrabold text-green-600">0</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-100 shadow-sm">
              <h3 className="text-lg font-bold text-purple-800 mb-2">Open Positions</h3>
              <p className="text-3xl font-extrabold text-purple-600">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
