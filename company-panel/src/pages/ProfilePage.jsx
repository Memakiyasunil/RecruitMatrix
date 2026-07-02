import React, { useState } from 'react';
import { User, Mail, Phone, Building2, Shield, Save } from 'lucide-react';

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  return (
    <div className="max-w-2xl space-y-6">
      <div><h1 className="text-2xl font-bold text-slate-800">My Profile</h1><p className="text-sm text-slate-400 mt-1">Manage your account and preferences</p></div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-5 mb-6 pb-6 border-b border-slate-100">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0"
            style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)' }}>CA</div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Client Admin</h2>
            <p className="text-slate-400 text-sm">admin@acmecorp.com</p>
            <span className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-sky-50 text-sky-600 text-xs font-medium rounded-full"><Shield size={12} /> Client Admin</span>
          </div>
          <div className="ml-auto">
            <button onClick={() => setEditing(!editing)}
              className="px-4 py-2 rounded-xl text-sm font-medium text-white hover:opacity-90"
              style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)' }}>
              {editing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {[
            { icon: User, label: 'Full Name', value: 'John Smith', type: 'text' },
            { icon: Mail, label: 'Email', value: 'admin@acmecorp.com', type: 'email' },
            { icon: Phone, label: 'Mobile', value: '+91 98765 43210', type: 'tel' },
            { icon: Building2, label: 'Company', value: 'Acme Corporation', type: 'text' },
          ].map(({ icon: Icon, label, value, type }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
                <Icon size={16} className="text-slate-400" />
              </div>
              <div className="flex-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</label>
                {editing ? (
                  <input type={type} defaultValue={value} className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200" />
                ) : (
                  <p className="text-sm text-slate-700 mt-0.5">{value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        {editing && (
          <div className="mt-6 flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white hover:opacity-90"
              style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)' }}>
              <Save size={15} /> Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
