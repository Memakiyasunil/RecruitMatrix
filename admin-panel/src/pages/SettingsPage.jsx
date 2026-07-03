import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { User, Mail, Lock, Shield, Bell } from 'lucide-react';

export default function SettingsPage() {
  const { currentUser } = useAuth();
  
  // Profile Form State
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
  });

  // Password Form State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [profileErrors, setProfileErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});

  const [activeTab, setActiveTab] = useState('profile');

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    if (!profileData.name?.trim()) {
      setProfileErrors({ name: 'Full Name is required' });
      return;
    }
    setProfileErrors({});
    alert('Profile update functionality will be connected to the backend.');
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    const errors = {};
    if (!passwordData.currentPassword) errors.currentPassword = 'Required';
    if (!passwordData.newPassword) errors.newPassword = 'Required';
    else if (passwordData.newPassword.length < 6) errors.newPassword = 'Must be at least 6 characters';
    if (passwordData.newPassword !== passwordData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    
    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }
    setPasswordErrors({});
    alert('Password updated successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your profile, password, and preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 shrink-0 space-y-1">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-[12px] text-sm font-medium transition-colors ${
              activeTab === 'profile' ? 'bg-[#4F46E5]/10 text-[#4F46E5]' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <User size={18} />
            My Profile
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-[12px] text-sm font-medium transition-colors ${
              activeTab === 'security' ? 'bg-[#4F46E5]/10 text-[#4F46E5]' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Shield size={18} />
            Security & Password
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-[12px] text-sm font-medium transition-colors ${
              activeTab === 'notifications' ? 'bg-[#4F46E5]/10 text-[#4F46E5]' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Bell size={18} />
            Notifications
          </button>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <Card className="border-none shadow-sm ring-1 ring-gray-100">
              <CardHeader className="border-b border-gray-50 bg-gray-50/50 rounded-t-[16px]">
                <CardTitle>Profile Details</CardTitle>
                <CardDescription>Update your personal information.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleProfileUpdate} className="space-y-5">
                  <div className="flex items-center gap-5 pb-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] flex items-center justify-center text-white text-2xl font-semibold shadow-sm">
                      {currentUser?.name ? currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <Button type="button" variant="outline" size="sm">Change Photo</Button>
                      <p className="text-xs text-gray-400 mt-2">JPG, GIF or PNG. Max size of 800K</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <Input 
                        icon={User}
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        className={profileErrors.name ? 'border-red-500' : ''}
                      />
                      {profileErrors.name && <p className="text-xs text-red-500 mt-1">{profileErrors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <Input 
                        icon={Mail}
                        type="email"
                        value={profileData.email}
                        disabled
                        className="bg-gray-50"
                      />
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed directly.</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <Input 
                        value={currentUser?.role || 'User'}
                        disabled
                        className="bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card className="border-none shadow-sm ring-1 ring-gray-100">
              <CardHeader className="border-b border-gray-50 bg-gray-50/50 rounded-t-[16px]">
                <CardTitle>Update Password</CardTitle>
                <CardDescription>Ensure your account is using a long, random password to stay secure.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handlePasswordUpdate} className="space-y-5 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <Input 
                      type="password"
                      icon={Lock}
                      required
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      className={passwordErrors.currentPassword ? 'border-red-500' : ''}
                    />
                    {passwordErrors.currentPassword && <p className="text-xs text-red-500 mt-1">{passwordErrors.currentPassword}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <Input 
                      type="password"
                      icon={Lock}
                      required
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      className={passwordErrors.newPassword ? 'border-red-500' : ''}
                    />
                    {passwordErrors.newPassword && <p className="text-xs text-red-500 mt-1">{passwordErrors.newPassword}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <Input 
                      type="password"
                      icon={Lock}
                      required
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      className={passwordErrors.confirmPassword ? 'border-red-500' : ''}
                    />
                    {passwordErrors.confirmPassword && <p className="text-xs text-red-500 mt-1">{passwordErrors.confirmPassword}</p>}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button type="submit">Update Password</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card className="border-none shadow-sm ring-1 ring-gray-100">
              <CardHeader className="border-b border-gray-50 bg-gray-50/50 rounded-t-[16px]">
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Decide how we communicate with you.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                      <p className="text-sm text-gray-500">Receive emails about new candidates and offers.</p>
                    </div>
                    <input type="checkbox" className="h-4 w-4 text-[#4F46E5] rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Browser Notifications</h4>
                      <p className="text-sm text-gray-500">Get push notifications for real-time updates.</p>
                    </div>
                    <input type="checkbox" className="h-4 w-4 text-[#4F46E5] rounded" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
