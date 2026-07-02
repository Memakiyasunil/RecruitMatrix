import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, MoreVertical } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';

// Initial Mock Data
const initialUsers = [
  { id: '1', name: 'Alice Smith', email: 'alice@recruitmatrix.com', role: 'Admin', status: 'Active', department: 'Management' },
  { id: '2', name: 'Bob Johnson', email: 'bob@recruitmatrix.com', role: 'Manager', status: 'Active', department: 'HR' },
  { id: '3', name: 'Charlie Davis', email: 'charlie@recruitmatrix.com', role: 'Recruiter', status: 'Inactive', department: 'Recruitment' },
];

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Recruiter', department: '', status: 'Active' });

  // Filtering
  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', role: 'Recruiter', department: '', status: 'Active' });
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({ ...user });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      // Update
      setUsers(users.map(u => u.id === editingUser.id ? { ...formData, id: u.id } : u));
    } else {
      // Create
      setUsers([{ ...formData, id: Date.now().toString() }, ...users]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage system users, roles, and access.</p>
        </div>
        <Button onClick={openAddModal} className="shrink-0">
          <Plus size={18} className="mr-2" />
          Add User
        </Button>
      </div>

      {/* Filters Area */}
      <div className="bg-white p-4 rounded-[16px] shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:max-w-sm">
          <Input 
            icon={Search} 
            placeholder="Search users..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* Additional filters can go here */}
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-[16px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    No users found matching your search.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#4F46E5]/10 text-[#4F46E5] flex items-center justify-center font-semibold">
                          {user.name.split(' ').map(n=>n[0]).join('').substring(0,2)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-gray-500 text-xs">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{user.role}</td>
                    <td className="px-6 py-4 text-gray-700">{user.department}</td>
                    <td className="px-6 py-4">
                      <Badge variant={user.status === 'Active' ? 'success' : 'danger'}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => openEditModal(user)}
                          className="p-2 text-gray-400 hover:text-[#4F46E5] hover:bg-[#4F46E5]/10 rounded-lg transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(user.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingUser ? "Edit User" : "Add New User"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <Input 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <Input 
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="john@example.com"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select 
                className="w-full h-11 rounded-[16px] border border-gray-200 bg-white px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              >
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Recruiter">Recruiter</option>
                <option value="Client">Client</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select 
                className="w-full h-11 rounded-[16px] border border-gray-200 bg-white px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <Input 
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
              placeholder="e.g. HR, Engineering"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-6">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingUser ? 'Save Changes' : 'Create User'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
