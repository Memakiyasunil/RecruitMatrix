import React, { useState, useEffect, useRef } from 'react';
import {
  Users, Plus, Search, Filter, Edit2, Trash2, X, Save,
  CheckCircle, Clock, Calendar, BarChart2, Download, User,
  Mail, Phone, Building2, Shield, LogIn, LogOut, ClipboardList,
  ChevronDown, AlertCircle, Star, Briefcase, MapPin, Send,
  ThumbsUp, ThumbsDown, Eye, FileText, Award, TrendingUp,
  Activity, Target, PieChart, ArrowUp, ArrowDown, RefreshCw
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RechartsPie, Pie, Cell, Legend } from 'recharts';
import { useAuth } from '../context/AuthContext';

const API = 'http://localhost:5000/api/v1';

// ─── Shared Helpers ───────────────────────────────────────────────────────────
const Input = ({ label, required, error, className = '', ...props }) => (
  <div>
    {label && <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>}
    <input {...props} className={`w-full px-3 py-2.5 rounded-xl border ${error ? 'border-red-400' : 'border-slate-200'} text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 bg-white transition-all ${className}`} />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const Select = ({ label, required, children, ...props }) => (
  <div>
    {label && <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>}
    <select {...props} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 bg-white transition-all">
      {children}
    </select>
  </div>
);

const Modal = ({ open, onClose, title, children, maxW = 'max-w-2xl' }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className={`bg-white rounded-2xl shadow-2xl w-full ${maxW} max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-800 text-lg">{title}</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"><X size={18} /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

const Confirm = ({ open, message, onConfirm, onCancel }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center"><AlertCircle size={20} className="text-red-600" /></div>
          <p className="text-slate-700 font-medium">{message}</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700">Delete</button>
        </div>
      </div>
    </div>
  );
};

const DEPT_OPTIONS = ['Management', 'Engineering', 'Human Resources', 'Finance', 'Marketing', 'Operations', 'Sales', 'Design', 'Analytics', 'Legal'];
const ROLE_OPTIONS = ['CEO', 'CTO', 'CFO', 'VP Engineering', 'Engineering Manager', 'Senior Engineer', 'Junior Engineer', 'HR Manager', 'HR Executive', 'Finance Manager', 'Accountant', 'Marketing Manager', 'Sales Manager', 'Operations Manager', 'Team Lead', 'Intern'];

// ─── 1. EMPLOYEE MANAGEMENT (Full CRUD) ────────────────────────────────────────
const EMPTY_EMP = { name: '', role: '', dept: '', email: '', mobile: '', salary: '', joiningDate: '', address: '', status: 'Active' };
const MOCK_EMPLOYEES = [
  { id: 'EMP-001', name: 'Alice Johnson', role: 'CEO', dept: 'Management', email: 'alice@company.com', mobile: '+91 98765 10001', salary: '150000', joiningDate: '2020-01-15', status: 'Active', address: 'Mumbai' },
  { id: 'EMP-002', name: 'Bob Smith', role: 'HR Manager', dept: 'Human Resources', email: 'bob@company.com', mobile: '+91 98765 10002', salary: '80000', joiningDate: '2021-03-10', status: 'Active', address: 'Bengaluru' },
  { id: 'EMP-003', name: 'Charlie Davis', role: 'Senior Engineer', dept: 'Engineering', email: 'charlie@company.com', mobile: '+91 98765 10003', salary: '95000', joiningDate: '2022-06-01', status: 'Inactive', address: 'Delhi' },
  { id: 'EMP-004', name: 'Diana Prince', role: 'Marketing Manager', dept: 'Marketing', email: 'diana@company.com', mobile: '+91 98765 10004', salary: '75000', joiningDate: '2021-09-15', status: 'Active', address: 'Hyderabad' },
  { id: 'EMP-005', name: 'Ethan Hunt', role: 'Finance Manager', dept: 'Finance', email: 'ethan@company.com', mobile: '+91 98765 10005', salary: '85000', joiningDate: '2023-01-20', status: 'Active', address: 'Chennai' },
];

export function FullEmployeeManagementPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(EMPTY_EMP);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => { fetchEmployees(); }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/company/employees`);
      const data = await res.json();
      setEmployees(data.success && data.data.length > 0 ? data.data : MOCK_EMPLOYEES);
    } catch { setEmployees(MOCK_EMPLOYEES); }
    finally { setLoading(false); }
  };

  const openAdd = () => { setEditTarget(null); setForm(EMPTY_EMP); setErrors({}); setShowModal(true); };
  const openEdit = (emp) => { setEditTarget(emp); setForm({ ...emp }); setErrors({}); setShowModal(true); };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.role.trim()) e.role = 'Required';
    if (!form.dept.trim()) e.dept = 'Required';
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      if (editTarget) {
        const res = await fetch(`${API}/company/employees/${editTarget.id}`, {
          method: 'PATCH', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, updatedAt: new Date().toISOString() })
        });
        if (res.ok) {
          setEmployees(prev => prev.map(e => e.id === editTarget.id ? { ...e, ...form } : e));
          showToast('Employee updated successfully');
        }
      } else {
        const res = await fetch(`${API}/company/employees`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, createdAt: new Date().toISOString() })
        });
        const data = await res.json();
        setEmployees(prev => [...prev, data.data || { ...form, id: `EMP-${Date.now()}` }]);
        showToast('Employee added successfully');
      }
      setShowModal(false);
    } catch {
      // Optimistic UI update for demo
      if (editTarget) {
        setEmployees(prev => prev.map(e => e.id === editTarget.id ? { ...e, ...form } : e));
        showToast('Employee updated');
      } else {
        setEmployees(prev => [...prev, { ...form, id: `EMP-${Date.now()}` }]);
        showToast('Employee added');
      }
      setShowModal(false);
    } finally { setSaving(false); }
  };

  const handleDelete = async (emp) => {
    try {
      await fetch(`${API}/company/employees/${emp.id}`, { method: 'DELETE' });
    } catch {}
    setEmployees(prev => prev.filter(e => e.id !== emp.id));
    setConfirm(null);
    showToast('Employee removed', 'error');
  };

  const toggleStatus = async (emp) => {
    const newStatus = emp.status === 'Active' ? 'Inactive' : 'Active';
    try { await fetch(`${API}/company/employees/${emp.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: newStatus }) }); }
    catch {}
    setEmployees(prev => prev.map(e => e.id === emp.id ? { ...e, status: newStatus } : e));
  };

  const filtered = employees.filter(emp => {
    const q = search.toLowerCase();
    const ms = !q || `${emp.name} ${emp.role} ${emp.email}`.toLowerCase().includes(q);
    const md = !deptFilter || emp.dept === deptFilter;
    const mst = !statusFilter || emp.status === statusFilter;
    return ms && md && mst;
  });

  const set = (f, v) => setForm(prev => ({ ...prev, [f]: v }));

  return (
    <div className="p-6">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium flex items-center gap-2 ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
          <CheckCircle size={16} /> {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-slate-800">Employee Management</h1><p className="text-slate-500 text-sm mt-0.5">Add, edit, and manage your team members</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-all" style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)' }}>
          <Plus size={16} /> Add Employee
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Employees', count: employees.length, color: 'text-slate-700', bg: 'bg-slate-50 border-slate-200' },
          { label: 'Active', count: employees.filter(e => e.status === 'Active').length, color: 'text-green-700', bg: 'bg-green-50 border-green-200' },
          { label: 'Inactive', count: employees.filter(e => e.status === 'Inactive').length, color: 'text-red-700', bg: 'bg-red-50 border-red-200' },
          { label: 'Departments', count: [...new Set(employees.map(e => e.dept))].length, color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-200' },
        ].map(({ label, count, color, bg }) => (
          <div key={label} className={`rounded-xl border p-4 ${bg}`}>
            <div className={`text-2xl font-bold ${color}`}>{count}</div>
            <div className="text-xs text-slate-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-48">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, role, email…"
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200" />
        </div>
        <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none">
          <option value="">All Departments</option>
          {DEPT_OPTIONS.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none">
          <option value="">All Status</option>
          <option>Active</option><option>Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>{['Employee', 'Role', 'Department', 'Contact', 'Joining Date', 'Status', 'Actions'].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? <tr><td colSpan={7} className="text-center py-12 text-slate-400">Loading…</td></tr>
                : filtered.map(emp => (
                <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)' }}>
                        {emp.name?.[0]?.toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{emp.name}</p>
                        <p className="text-slate-400 text-xs">{emp.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">{emp.role}</td>
                  <td className="px-4 py-4"><span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">{emp.dept}</span></td>
                  <td className="px-4 py-4">
                    <p className="text-sm text-slate-700">{emp.email}</p>
                    <p className="text-xs text-slate-400">{emp.mobile}</p>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">{emp.joiningDate || '—'}</td>
                  <td className="px-4 py-4">
                    <button onClick={() => toggleStatus(emp)} className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${emp.status === 'Active' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}>
                      {emp.status}
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(emp)} className="p-1.5 rounded-lg hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 transition-colors" title="Edit">
                        <Edit2 size={15} />
                      </button>
                      <button onClick={() => setConfirm(emp)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors" title="Delete">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && filtered.length === 0 && <tr><td colSpan={7} className="text-center py-12 text-slate-400">No employees found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title={editTarget ? 'Edit Employee' : 'Add New Employee'}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Full Name" required value={form.name} onChange={e => set('name', e.target.value)} error={errors.name} placeholder="John Smith" />
          <Select label="Role" required value={form.role} onChange={e => set('role', e.target.value)}>
            <option value="">Select Role</option>
            {ROLE_OPTIONS.map(r => <option key={r}>{r}</option>)}
          </Select>
          <Select label="Department" required value={form.dept} onChange={e => set('dept', e.target.value)}>
            <option value="">Select Department</option>
            {DEPT_OPTIONS.map(d => <option key={d}>{d}</option>)}
          </Select>
          <Select label="Status" value={form.status} onChange={e => set('status', e.target.value)}>
            <option>Active</option><option>Inactive</option>
          </Select>
          <Input label="Email" type="email" value={form.email} onChange={e => set('email', e.target.value)} error={errors.email} placeholder="john@company.com" />
          <Input label="Mobile" type="tel" value={form.mobile} onChange={e => set('mobile', e.target.value)} placeholder="+91 98765 43210" />
          <Input label="Monthly Salary (₹)" type="number" value={form.salary} onChange={e => set('salary', e.target.value)} placeholder="75000" />
          <Input label="Joining Date" type="date" value={form.joiningDate} onChange={e => set('joiningDate', e.target.value)} />
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Address</label>
            <input value={form.address} onChange={e => set('address', e.target.value)} placeholder="City, State" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200" />
          </div>
        </div>
        <div className="flex gap-3 mt-6 pt-4 border-t border-slate-100">
          <button onClick={() => setShowModal(false)} className="flex-1 py-3 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50">Cancel</button>
          <button onClick={handleSave} disabled={saving} className="flex-1 py-3 rounded-xl text-sm font-bold text-white disabled:opacity-60 flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)' }}>
            {saving ? 'Saving…' : <><Save size={15} />{editTarget ? 'Save Changes' : 'Add Employee'}</>}
          </button>
        </div>
      </Modal>

      <Confirm open={!!confirm} message={`Delete ${confirm?.name}? This cannot be undone.`} onConfirm={() => handleDelete(confirm)} onCancel={() => setConfirm(null)} />
    </div>
  );
}

// ─── 2. ATTENDANCE (In/Out) ────────────────────────────────────────────────────
export function FullAttendancePage() {
  const [employees] = useState(MOCK_EMPLOYEES.filter(e => e.status === 'Active'));
  const [attendance, setAttendance] = useState([]);
  const [tab, setTab] = useState('today');
  const [dateFilter, setDateFilter] = useState(new Date().toISOString().split('T')[0]);
  const [toast, setToast] = useState(null);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => { fetchAttendance(); }, [dateFilter]);

  const showToast = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 2500); };

  const fetchAttendance = async () => {
    try {
      const res = await fetch(`${API}/company/attendance?date=${tab === 'today' ? today : dateFilter}`);
      const data = await res.json();
      setAttendance(data.success ? data.data : []);
    } catch { setAttendance([]); }
  };

  const punch = async (emp, type) => {
    try {
      const res = await fetch(`${API}/company/attendance/punch`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId: emp.id, employeeName: emp.name, type })
      });
      const data = await res.json();
      if (data.success) {
        showToast(`${emp.name} punched ${type} at ${new Date().toLocaleTimeString()}`);
        fetchAttendance();
      } else {
        showToast(data.message, 'error');
      }
    } catch {
      // Optimistic update
      const now = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
      if (type === 'in') {
        setAttendance(prev => [...prev, { id: Date.now(), employeeId: emp.id, employeeName: emp.name, date: today, punchIn: now, punchOut: null }]);
        showToast(`${emp.name} punched in at ${now}`);
      } else {
        setAttendance(prev => prev.map(a => a.employeeId === emp.id && !a.punchOut ? { ...a, punchOut: now } : a));
        showToast(`${emp.name} punched out at ${now}`);
      }
    }
  };

  const getRecord = (empId) => attendance.find(a => a.employeeId === empId);

  const calcHours = (rec) => {
    if (!rec?.punchIn || !rec?.punchOut) return '—';
    const [h1, m1] = rec.punchIn.split(':').map(Number);
    const [h2, m2] = rec.punchOut.split(':').map(Number);
    const diff = (h2 * 60 + m2) - (h1 * 60 + m1);
    if (diff <= 0) return '—';
    return `${Math.floor(diff / 60)}h ${diff % 60}m`;
  };

  const present = attendance.filter(a => a.date === today).length;
  const onTime = attendance.filter(a => {
    if (!a.punchIn) return false;
    const [h] = a.punchIn.split(':').map(Number);
    return h <= 9;
  }).length;

  return (
    <div className="p-6">
      {toast && <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium flex items-center gap-2 ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}><CheckCircle size={16} /> {toast.msg}</div>}

      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-slate-800">Employee Attendance</h1><p className="text-slate-500 text-sm mt-0.5">Track daily in/out for all employees</p></div>
        <div className="flex gap-2">
          <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg font-medium">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Staff', count: employees.length, color: 'text-slate-700', bg: 'bg-slate-50 border-slate-200' },
          { label: 'Present Today', count: present, color: 'text-green-700', bg: 'bg-green-50 border-green-200' },
          { label: 'Absent', count: employees.length - present, color: 'text-red-700', bg: 'bg-red-50 border-red-200' },
          { label: 'On Time', count: onTime, color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-200' },
        ].map(({ label, count, color, bg }) => (
          <div key={label} className={`rounded-xl border p-4 ${bg}`}>
            <div className={`text-2xl font-bold ${color}`}>{count}</div>
            <div className="text-xs text-slate-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 bg-slate-100 p-1 rounded-xl w-fit">
        {['today', 'history'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
            {t === 'today' ? "Today's Attendance" : 'Attendance History'}
          </button>
        ))}
      </div>

      {tab === 'history' && (
        <div className="mb-4 flex items-center gap-3">
          <label className="text-sm text-slate-600 font-medium">Select Date:</label>
          <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none" />
        </div>
      )}

      {/* Today's Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>{['Employee', 'Department', 'Punch In', 'Punch Out', 'Hours Worked', 'Status', 'Actions'].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {employees.map(emp => {
                const rec = getRecord(emp.id);
                return (
                  <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)' }}>
                          {emp.name?.[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800 text-sm">{emp.name}</p>
                          <p className="text-slate-400 text-xs">{emp.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4"><span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">{emp.dept}</span></td>
                    <td className="px-4 py-4">
                      {rec?.punchIn ? <span className="text-sm font-semibold text-green-600 flex items-center gap-1"><LogIn size={13} />{rec.punchIn}</span>
                        : <span className="text-slate-300 text-sm">Not punched in</span>}
                    </td>
                    <td className="px-4 py-4">
                      {rec?.punchOut ? <span className="text-sm font-semibold text-red-500 flex items-center gap-1"><LogOut size={13} />{rec.punchOut}</span>
                        : <span className="text-slate-300 text-sm">—</span>}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-sm font-medium ${rec?.punchOut ? 'text-slate-700' : 'text-slate-400'}`}>{calcHours(rec)}</span>
                    </td>
                    <td className="px-4 py-4">
                      {!rec ? <span className="text-xs px-2.5 py-1 rounded-full bg-red-100 text-red-700 font-semibold">Absent</span>
                        : rec.punchOut ? <span className="text-xs px-2.5 py-1 rounded-full bg-green-100 text-green-700 font-semibold">Complete</span>
                        : <span className="text-xs px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">Working</span>}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {!rec && (
                          <button onClick={() => punch(emp, 'in')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors">
                            <LogIn size={12} /> Punch In
                          </button>
                        )}
                        {rec && !rec.punchOut && (
                          <button onClick={() => punch(emp, 'out')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors">
                            <LogOut size={12} /> Punch Out
                          </button>
                        )}
                        {rec?.punchOut && <span className="text-xs text-slate-400">Done ✓</span>}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── 3. TASK MANAGEMENT (Full CRUD) ────────────────────────────────────────────
const EMPTY_TASK = { title: '', description: '', priority: 'medium', status: 'pending', assignee: '', dueDate: '' };
const MOCK_TASKS = [
  { id: 'TSK-001', title: 'Review Q3 Technical Assessments', description: 'Go through all candidate tech assessments for Q3 hiring batch.', priority: 'high', status: 'in-progress', assignee: 'Bob Smith', dueDate: '2026-07-10' },
  { id: 'TSK-002', title: 'Onboard New Junior Developers', description: 'Set up accounts, orientation schedule, and mentorship pairings.', priority: 'medium', status: 'pending', assignee: 'Alice Johnson', dueDate: '2026-07-15' },
  { id: 'TSK-003', title: 'Prepare Monthly HR Report', description: 'Compile hiring metrics, attrition data, and attendance summary.', priority: 'high', status: 'pending', assignee: 'Bob Smith', dueDate: '2026-07-31' },
  { id: 'TSK-004', title: 'Refactor Core Backend API', description: 'Performance optimization and code cleanup for v2.', priority: 'critical', status: 'completed', assignee: 'Charlie Davis', dueDate: '2026-07-01' },
  { id: 'TSK-005', title: 'Update Employee Policies', description: 'Revise remote work and attendance policies for 2026.', priority: 'low', status: 'pending', assignee: 'Diana Prince', dueDate: '2026-08-01' },
];

const PRIORITY_CONFIG = {
  critical: { label: 'Critical', color: 'bg-red-100 text-red-700 border-red-200' },
  high: { label: 'High', color: 'bg-orange-100 text-orange-700 border-orange-200' },
  medium: { label: 'Medium', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  low: { label: 'Low', color: 'bg-slate-100 text-slate-600 border-slate-200' },
};

const STATUS_CONFIG = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700' },
  'in-progress': { label: 'In Progress', color: 'bg-indigo-100 text-indigo-700' },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-600' },
};

export function FullTaskManagementPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [tab, setTab] = useState('list');
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(EMPTY_TASK);
  const [saving, setSaving] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => { fetchTasks(); }, []);

  const showToast = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/tasks`);
      const data = await res.json();
      setTasks(data.success && data.data.length > 0 ? data.data : MOCK_TASKS);
    } catch { setTasks(MOCK_TASKS); }
    finally { setLoading(false); }
  };

  const openAdd = () => { setEditTarget(null); setForm(EMPTY_TASK); setShowModal(true); };
  const openEdit = (task) => { setEditTarget(task); setForm({ ...task }); setShowModal(true); };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      if (editTarget) {
        await fetch(`${API}/tasks/${editTarget.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        setTasks(prev => prev.map(t => t.id === editTarget.id ? { ...t, ...form } : t));
        showToast('Task updated');
      } else {
        const res = await fetch(`${API}/tasks`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, createdAt: new Date().toISOString() }) });
        const data = await res.json();
        setTasks(prev => [...prev, data.data || { ...form, id: `TSK-${Date.now()}` }]);
        showToast('Task created');
      }
      setShowModal(false);
    } catch {
      if (editTarget) setTasks(prev => prev.map(t => t.id === editTarget.id ? { ...t, ...form } : t));
      else setTasks(prev => [...prev, { ...form, id: `TSK-${Date.now()}` }]);
      showToast(editTarget ? 'Task updated' : 'Task created');
      setShowModal(false);
    } finally { setSaving(false); }
  };

  const handleDelete = async (task) => {
    try { await fetch(`${API}/tasks/${task.id}`, { method: 'DELETE' }); } catch {}
    setTasks(prev => prev.filter(t => t.id !== task.id));
    setConfirm(null);
    showToast('Task deleted', 'error');
  };

  const updateStatus = async (task, newStatus) => {
    try { await fetch(`${API}/tasks/${task.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: newStatus }) }); } catch {}
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: newStatus } : t));
  };

  const filtered = tasks.filter(t => {
    const q = search.toLowerCase();
    const ms = !q || `${t.title} ${t.assignee}`.toLowerCase().includes(q);
    const mp = !priorityFilter || t.priority === priorityFilter;
    const mst = !statusFilter || t.status === statusFilter;
    return ms && mp && mst;
  });

  const setF = (f, v) => setForm(prev => ({ ...prev, [f]: v }));

  const isOverdue = (task) => task.dueDate && task.status !== 'completed' && new Date(task.dueDate) < new Date();

  // Kanban
  const KanbanCol = ({ title, statusKey, color }) => {
    const colTasks = filtered.filter(t => t.status === statusKey);
    return (
      <div className="flex-1 min-w-64">
        <div className={`flex items-center gap-2 mb-3 px-3 py-2 rounded-xl ${color}`}>
          <span className="font-semibold text-sm">{title}</span>
          <span className="ml-auto text-xs bg-white/60 px-2 py-0.5 rounded-full font-bold">{colTasks.length}</span>
        </div>
        <div className="space-y-3">
          {colTasks.map(task => (
            <div key={task.id} className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="font-semibold text-slate-800 text-sm leading-snug">{task.title}</p>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border flex-shrink-0 ${PRIORITY_CONFIG[task.priority]?.color}`}>{PRIORITY_CONFIG[task.priority]?.label}</span>
              </div>
              {task.description && <p className="text-xs text-slate-400 mb-3 line-clamp-2">{task.description}</p>}
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">{task.assignee || 'Unassigned'}</span>
                <div className="flex items-center gap-1">
                  <button onClick={() => openEdit(task)} className="p-1 text-slate-400 hover:text-indigo-500"><Edit2 size={12} /></button>
                  <button onClick={() => setConfirm(task)} className="p-1 text-slate-400 hover:text-red-500"><Trash2 size={12} /></button>
                </div>
              </div>
              {task.dueDate && <p className={`text-[10px] mt-2 flex items-center gap-1 ${isOverdue(task) ? 'text-red-500 font-semibold' : 'text-slate-400'}`}><Clock size={10} />{task.dueDate}{isOverdue(task) && ' ⚠️ Overdue'}</p>}
            </div>
          ))}
          {colTasks.length === 0 && <div className="text-center py-6 text-slate-300 text-sm border-2 border-dashed border-slate-100 rounded-xl">No tasks</div>}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      {toast && <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium flex items-center gap-2 ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}><CheckCircle size={16} />{toast.msg}</div>}

      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-slate-800">Task Management</h1><p className="text-slate-500 text-sm mt-0.5">Create, assign, and track all tasks</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-all" style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)' }}>
          <Plus size={16} /> Create Task
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total', count: tasks.length, bg: 'bg-slate-50 border-slate-200', color: 'text-slate-700' },
          { label: 'Pending', count: tasks.filter(t => t.status === 'pending').length, bg: 'bg-yellow-50 border-yellow-200', color: 'text-yellow-700' },
          { label: 'In Progress', count: tasks.filter(t => t.status === 'in-progress').length, bg: 'bg-indigo-50 border-indigo-200', color: 'text-indigo-700' },
          { label: 'Completed', count: tasks.filter(t => t.status === 'completed').length, bg: 'bg-green-50 border-green-200', color: 'text-green-700' },
        ].map(({ label, count, bg, color }) => (
          <div key={label} className={`rounded-xl border p-4 ${bg}`}>
            <div className={`text-2xl font-bold ${color}`}>{count}</div>
            <div className="text-xs text-slate-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* View toggle + filters */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
          {['list', 'kanban'].map(v => (
            <button key={v} onClick={() => setTab(v)} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${tab === v ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}>
              {v === 'list' ? 'List' : 'Kanban'}
            </button>
          ))}
        </div>
        <div className="relative flex-1 min-w-40">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tasks…" className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none" />
        </div>
        <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none">
          <option value="">All Priority</option>
          {Object.entries(PRIORITY_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none">
          <option value="">All Status</option>
          {Object.entries(STATUS_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
      </div>

      {/* Kanban View */}
      {tab === 'kanban' && (
        <div className="flex gap-4 overflow-x-auto pb-4">
          <KanbanCol title="Pending" statusKey="pending" color="bg-yellow-50 text-yellow-700" />
          <KanbanCol title="In Progress" statusKey="in-progress" color="bg-indigo-50 text-indigo-700" />
          <KanbanCol title="Completed" statusKey="completed" color="bg-green-50 text-green-700" />
          <KanbanCol title="Cancelled" statusKey="cancelled" color="bg-red-50 text-red-700" />
        </div>
      )}

      {/* List View */}
      {tab === 'list' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>{['Task', 'Priority', 'Assigned To', 'Due Date', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">{h}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? <tr><td colSpan={6} className="text-center py-12 text-slate-400">Loading…</td></tr>
                  : filtered.map(task => (
                  <tr key={task.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-4 max-w-xs">
                      <p className={`font-semibold text-slate-800 text-sm ${isOverdue(task) ? 'text-red-700' : ''}`}>{task.title}</p>
                      {task.description && <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{task.description}</p>}
                      {isOverdue(task) && <span className="text-[10px] text-red-500 font-semibold">⚠️ Overdue</span>}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${PRIORITY_CONFIG[task.priority]?.color || 'bg-slate-100 text-slate-600'}`}>
                        {PRIORITY_CONFIG[task.priority]?.label || task.priority}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">{task.assignee?.[0] || '?'}</div>
                        <span className="text-sm text-slate-600">{task.assignee || 'Unassigned'}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-500">
                      <span className={isOverdue(task) ? 'text-red-500 font-semibold' : ''}>{task.dueDate || '—'}</span>
                    </td>
                    <td className="px-4 py-4">
                      <select value={task.status} onChange={e => updateStatus(task, e.target.value)}
                        className={`text-xs px-2.5 py-1 rounded-full font-semibold border-0 focus:outline-none cursor-pointer ${STATUS_CONFIG[task.status]?.color || 'bg-slate-100 text-slate-600'}`}>
                        {Object.entries(STATUS_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(task)} className="p-1.5 rounded-lg hover:bg-indigo-50 text-slate-400 hover:text-indigo-600"><Edit2 size={14} /></button>
                        <button onClick={() => setConfirm(task)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!loading && filtered.length === 0 && <tr><td colSpan={6} className="text-center py-12 text-slate-400">No tasks found</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title={editTarget ? 'Edit Task' : 'Create Task'} maxW="max-w-lg">
        <div className="space-y-4">
          <Input label="Task Title" required value={form.title} onChange={e => setF('title', e.target.value)} placeholder="e.g. Review candidate profiles" />
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Description</label>
            <textarea rows={3} value={form.description} onChange={e => setF('description', e.target.value)} placeholder="Detailed task description…" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select label="Priority" value={form.priority} onChange={e => setF('priority', e.target.value)}>
              {Object.entries(PRIORITY_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </Select>
            <Select label="Status" value={form.status} onChange={e => setF('status', e.target.value)}>
              {Object.entries(STATUS_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Assign To" value={form.assignee} onChange={e => setF('assignee', e.target.value)} placeholder="Employee name" />
            <Input label="Due Date" type="date" value={form.dueDate} onChange={e => setF('dueDate', e.target.value)} />
          </div>
        </div>
        <div className="flex gap-3 mt-6 pt-4 border-t border-slate-100">
          <button onClick={() => setShowModal(false)} className="flex-1 py-3 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50">Cancel</button>
          <button onClick={handleSave} disabled={saving || !form.title.trim()} className="flex-1 py-3 rounded-xl text-sm font-bold text-white disabled:opacity-60" style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)' }}>
            {saving ? 'Saving…' : editTarget ? 'Save Changes' : 'Create Task'}
          </button>
        </div>
      </Modal>

      <Confirm open={!!confirm} message={`Delete task "${confirm?.title}"?`} onConfirm={() => handleDelete(confirm)} onCancel={() => setConfirm(null)} />
    </div>
  );
}

// ─── 4. SHORTLIST REVIEW (Approve / Reject) ────────────────────────────────────
const MOCK_SHORTLIST = [
  { id: 'app-1', firstName: 'Rahul', lastName: 'Sharma', positionApplied: 'Senior React Developer', totalExperience: 5, currentCTC: 12, expectedCTC: 18, noticePeriod: 30, skills: ['React', 'Node.js', 'Firebase'], email: 'rahul@ex.com', mobile: '+91 98765 11111', currentLocation: 'Mumbai', status: 'Shortlisted', currentCompany: 'TechCorp' },
  { id: 'app-2', firstName: 'Meera', lastName: 'Iyer', positionApplied: 'Senior React Developer', totalExperience: 4, currentCTC: 10, expectedCTC: 15, noticePeriod: 45, skills: ['Angular', 'Java', 'MySQL'], email: 'meera@ex.com', mobile: '+91 98765 22222', currentLocation: 'Bengaluru', status: 'Shortlisted', currentCompany: 'Infosys' },
  { id: 'app-3', firstName: 'Karan', lastName: 'Mehta', positionApplied: 'QA Engineer', totalExperience: 3, currentCTC: 8, expectedCTC: 12, noticePeriod: 15, skills: ['Selenium', 'JIRA', 'Postman'], email: 'karan@ex.com', mobile: '+91 98765 33333', currentLocation: 'Pune', status: 'Shortlisted', currentCompany: 'Wipro' },
];

export function FullShortlistReviewPage() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [updating, setUpdating] = useState(null);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => { fetchCandidates(); }, []);

  const showToast = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 2500); };

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/applications?status=Shortlisted`);
      const data = await res.json();
      const shortlisted = (data.success ? data.data : []).filter(a => a.status === 'Shortlisted');
      setCandidates(shortlisted.length > 0 ? shortlisted : MOCK_SHORTLIST);
    } catch { setCandidates(MOCK_SHORTLIST); }
    finally { setLoading(false); }
  };

  const updateStatus = async (id, newStatus) => {
    setUpdating(id);
    try {
      await fetch(`${API}/applications/${id}/status`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, stage: newStatus })
      });
    } catch {}
    setCandidates(prev => prev.filter(c => c.id !== id));
    showToast(`Candidate ${newStatus.toLowerCase()}`, newStatus === 'Rejected' ? 'error' : 'success');
    setUpdating(null);
    if (selected?.id === id) setSelected(null);
  };

  const filtered = candidates.filter(c =>
    !search || `${c.firstName} ${c.lastName} ${c.positionApplied}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {toast && <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium flex items-center gap-2 ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}><CheckCircle size={16} />{toast.msg}</div>}

      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-slate-800">Shortlist Review</h1><p className="text-slate-500 text-sm mt-0.5">Review shortlisted candidates and approve or reject</p></div>
        <span className="text-sm bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-xl font-semibold">{candidates.length} Pending Review</span>
      </div>

      <div className="relative mb-5 max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search candidates…" className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none" />
      </div>

      {loading ? (
        <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-32 bg-white rounded-2xl animate-pulse border border-slate-100" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
          <CheckCircle size={48} className="text-slate-200 mx-auto mb-3" />
          <p className="text-slate-500">All shortlisted candidates have been reviewed</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(c => (
            <div key={c.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 flex-wrap">
                {/* Avatar + Info */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0" style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)' }}>
                  {c.firstName?.[0]}{c.lastName?.[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-slate-800">{c.firstName} {c.lastName}</h3>
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">Pending Review</span>
                  </div>
                  <p className="text-slate-500 text-sm mb-2">{c.positionApplied} • {c.currentCompany}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-3">
                    <span>Exp: <strong className="text-slate-700">{c.totalExperience} yrs</strong></span>
                    <span>Current: <strong className="text-slate-700">₹{c.currentCTC} LPA</strong></span>
                    <span>Expected: <strong className="text-slate-700">₹{c.expectedCTC} LPA</strong></span>
                    <span>Notice: <strong className="text-slate-700">{c.noticePeriod}d</strong></span>
                    <span className="flex items-center gap-1"><MapPin size={12} />{c.currentLocation}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {c.skills?.map(s => <span key={s} className="text-xs bg-sky-50 text-sky-600 px-2 py-0.5 rounded-full">{s}</span>)}
                  </div>
                </div>
                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => setSelected(c)} className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-xl transition-colors" title="View Details">
                    <Eye size={18} />
                  </button>
                  <button onClick={() => updateStatus(c.id, 'Interview Scheduled')} disabled={updating === c.id}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-green-700 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors disabled:opacity-50">
                    <ThumbsUp size={14} /> Approve
                  </button>
                  <button onClick={() => updateStatus(c.id, 'Rejected')} disabled={updating === c.id}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors disabled:opacity-50">
                    <ThumbsDown size={14} /> Reject
                  </button>
                  <button onClick={() => updateStatus(c.id, 'Hold')} disabled={updating === c.id}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-orange-600 bg-orange-50 border border-orange-200 rounded-xl hover:bg-orange-100 transition-colors disabled:opacity-50">
                    Hold
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title={`${selected?.firstName} ${selected?.lastName}`}>
        {selected && (
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Email', value: selected.email, icon: Mail },
                { label: 'Mobile', value: selected.mobile, icon: Phone },
                { label: 'Location', value: selected.currentLocation, icon: MapPin },
                { label: 'Experience', value: `${selected.totalExperience} years`, icon: Briefcase },
                { label: 'Current CTC', value: `₹${selected.currentCTC} LPA`, icon: Star },
                { label: 'Expected CTC', value: `₹${selected.expectedCTC} LPA`, icon: TrendingUp },
                { label: 'Notice Period', value: `${selected.noticePeriod} days`, icon: Clock },
                { label: 'Current Company', value: selected.currentCompany, icon: Building2 },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-start gap-2">
                  <Icon size={14} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                  <div><p className="text-xs text-slate-400">{label}</p><p className="font-medium text-slate-700">{value}</p></div>
                </div>
              ))}
            </div>
            {selected.skills?.length > 0 && (
              <div><p className="text-xs font-semibold text-slate-500 uppercase mb-2">Skills</p>
                <div className="flex flex-wrap gap-1.5">{selected.skills.map(s => <span key={s} className="text-xs bg-sky-50 text-sky-600 px-2.5 py-1 rounded-full">{s}</span>)}</div>
              </div>
            )}
            <div className="flex gap-3 pt-4 border-t border-slate-100">
              <button onClick={() => updateStatus(selected.id, 'Interview Scheduled')} className="flex-1 py-3 rounded-xl font-semibold text-green-700 bg-green-50 border border-green-200 hover:bg-green-100 text-sm">✓ Approve</button>
              <button onClick={() => updateStatus(selected.id, 'Rejected')} className="flex-1 py-3 rounded-xl font-semibold text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 text-sm">✕ Reject</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// ─── 5. CREATE REQUISITION (with API) ─────────────────────────────────────────
export function FullCreateRequisitionPage() {
  const { currentUser } = useAuth();
  const [form, setForm] = useState({
    positionName: '', positionCode: '', department: '', vacancies: 1, priority: 'medium',
    serviceType: 'Office', workMode: 'Office', employmentType: 'Full Time', positionDetails: '',
    salaryMin: '', salaryMax: '', tatDays: '', tatDate: '', contractType: 'Permanent',
    contractDuration: '', compensationComponents: [],
    education: '', experience: '', certification: '',
    city: '', district: '', state: '',
    domesticTravel: false, internationalTravel: false,
    documentsRequired: '', accommodation: false, accommodationType: '',
    accommodation: false
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  const set = (f, v) => setForm(prev => ({ ...prev, [f]: v }));

  const toggleComp = (comp) => {
    setForm(prev => ({
      ...prev,
      compensationComponents: prev.compensationComponents.includes(comp)
        ? prev.compensationComponents.filter(c => c !== comp)
        : [...prev.compensationComponents, comp]
    }));
  };

  const handleSubmit = async () => {
    if (!form.positionName || !form.department) { showToast('Position Name and Department are required', 'error'); return; }
    setSubmitting(true);
    try {
      await fetch(`${API}/requisitions`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, submittedBy: currentUser?.email, status: 'Pending Approval', createdAt: new Date().toISOString() })
      });
      setSubmitted(true);
      showToast('Talent Requisition submitted successfully!');
    } catch {
      setSubmitted(true);
      showToast('Requisition submitted successfully!');
    } finally { setSubmitting(false); }
  };

  if (submitted) return (
    <div className="p-6 flex items-center justify-center min-h-96">
      <div className="text-center max-w-sm">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"><CheckCircle size={40} className="text-green-600" /></div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Requisition Submitted!</h2>
        <p className="text-slate-500 mb-6">Your talent requisition for <strong>{form.positionName}</strong> has been submitted for admin approval.</p>
        <button onClick={() => { setSubmitted(false); setForm({ positionName: '', positionCode: '', department: '', vacancies: 1, priority: 'medium', serviceType: 'Office', workMode: 'Office', employmentType: 'Full Time', positionDetails: '', salaryMin: '', salaryMax: '', tatDays: '', tatDate: '', contractType: 'Permanent', contractDuration: '', compensationComponents: [], education: '', experience: '', certification: '', city: '', district: '', state: '', domesticTravel: false, internationalTravel: false, documentsRequired: '', accommodation: false, accommodationType: '' }); }}
          className="px-6 py-3 rounded-xl font-semibold text-white text-sm" style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)' }}>
          Create Another Requisition
        </button>
      </div>
    </div>
  );

  const Section = ({ title, children }) => (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <h2 className="font-semibold text-slate-700 mb-4 pb-3 border-b border-slate-100">{title}</h2>
      {children}
    </div>
  );

  const F = ({ label, required, children }) => (
    <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>{children}</div>
  );
  const I = (props) => <input {...props} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 bg-white" />;
  const S = ({ children, ...props }) => <select {...props} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 bg-white">{children}</select>;
  const T = (props) => <textarea {...props} rows={3} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 bg-white resize-none" />;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {toast && <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium flex items-center gap-2 ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}><CheckCircle size={16} />{toast.msg}</div>}

      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-slate-800">Create Talent Requisition</h1><p className="text-sm text-slate-400 mt-1">Fill in all required details for the position</p></div>
        <div className="flex gap-3">
          <button onClick={() => showToast('Draft saved!')} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-slate-200 text-slate-600 hover:bg-slate-50">
            Save Draft
          </button>
          <button onClick={handleSubmit} disabled={submitting} className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60" style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)' }}>
            <Send size={15} />{submitting ? 'Submitting…' : 'Submit Requisition'}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <Section title="Basic Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <F label="Position Name" required><I value={form.positionName} onChange={e => set('positionName', e.target.value)} placeholder="e.g. Senior Developer" /></F>
            <F label="Position Code"><I value={form.positionCode} onChange={e => set('positionCode', e.target.value)} placeholder="e.g. POS-001" /></F>
            <F label="Department / Business" required>
              <S value={form.department} onChange={e => set('department', e.target.value)}>
                <option value="">Select Department</option>
                {DEPT_OPTIONS.map(d => <option key={d}>{d}</option>)}
              </S>
            </F>
            <F label="No. of Vacancies" required><I type="number" min={1} value={form.vacancies} onChange={e => set('vacancies', e.target.value)} /></F>
            <F label="Priority">
              <S value={form.priority} onChange={e => set('priority', e.target.value)}>
                <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="critical">Critical</option>
              </S>
            </F>
            <F label="Employment Type">
              <S value={form.employmentType} onChange={e => set('employmentType', e.target.value)}>
                <option>Full Time</option><option>Part Time</option><option>Contract</option><option>Freelance</option>
              </S>
            </F>
            <F label="Work Mode">
              <S value={form.workMode} onChange={e => set('workMode', e.target.value)}>
                <option>Office</option><option>Remote</option><option>Hybrid</option><option>Deputation</option>
              </S>
            </F>
            <F label="Service Type">
              <S value={form.serviceType} onChange={e => set('serviceType', e.target.value)}>
                <option>Office</option><option>Field</option><option>Office + Field</option><option>Traveling</option>
              </S>
            </F>
            <div className="md:col-span-2"><F label="Position Details / Job Description"><T value={form.positionDetails} onChange={e => set('positionDetails', e.target.value)} placeholder="Describe the role, responsibilities, and expectations..." /></F></div>
          </div>
        </Section>

        <Section title="Salary & Contract">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <F label="Salary Min (LPA)"><I type="number" value={form.salaryMin} onChange={e => set('salaryMin', e.target.value)} placeholder="e.g. 8" /></F>
            <F label="Salary Max (LPA)"><I type="number" value={form.salaryMax} onChange={e => set('salaryMax', e.target.value)} placeholder="e.g. 15" /></F>
            <F label="TAT Days"><I type="number" value={form.tatDays} onChange={e => set('tatDays', e.target.value)} placeholder="Days to close" /></F>
            <F label="TAT Date"><I type="date" value={form.tatDate} onChange={e => set('tatDate', e.target.value)} /></F>
            <F label="Contract Type">
              <S value={form.contractType} onChange={e => set('contractType', e.target.value)}>
                <option>Permanent</option><option>Contractual</option><option>Fixed Term</option>
              </S>
            </F>
            <F label="Contract Duration (months)"><I type="number" value={form.contractDuration} onChange={e => set('contractDuration', e.target.value)} placeholder="For fixed term" /></F>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-slate-600 mb-2">Compensation Components</p>
            <div className="flex flex-wrap gap-3">
              {['Salary', 'PF', 'Commission', 'Incentive', 'Health Coverage', 'Variable Pay', 'Transport', 'HRA'].map(comp => (
                <label key={comp} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                  <input type="checkbox" checked={form.compensationComponents.includes(comp)} onChange={() => toggleComp(comp)} className="w-4 h-4 rounded accent-sky-500" />
                  {comp}
                </label>
              ))}
            </div>
          </div>
        </Section>

        <Section title="Requirements">
          <div className="space-y-3">
            {[['Education', 'education'], ['Experience', 'experience'], ['Certification', 'certification']].map(([label, key]) => (
              <div key={key} className="grid grid-cols-3 gap-3 items-center">
                <label className="text-sm text-slate-600 font-medium">{label}</label>
                <I className="col-span-2" value={form[key]} onChange={e => set(key, e.target.value)} placeholder={`Specify ${label.toLowerCase()}…`} />
              </div>
            ))}
          </div>
        </Section>

        <Section title="Location & Travel">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <F label="City"><I value={form.city} onChange={e => set('city', e.target.value)} placeholder="Work city" /></F>
            <F label="District"><I value={form.district} onChange={e => set('district', e.target.value)} placeholder="District" /></F>
            <F label="State"><I value={form.state} onChange={e => set('state', e.target.value)} placeholder="State" /></F>
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={form.domesticTravel} onChange={e => set('domesticTravel', e.target.checked)} className="accent-sky-500 w-4 h-4" /> Domestic Travel</label>
            <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={form.internationalTravel} onChange={e => set('internationalTravel', e.target.checked)} className="accent-sky-500 w-4 h-4" /> International Travel</label>
          </div>
        </Section>

        <Section title="Documents & Accommodation">
          <F label="Documents Required"><T value={form.documentsRequired} onChange={e => set('documentsRequired', e.target.value)} placeholder="List required documents..." /></F>
          <div className="mt-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer mb-3">
              <input type="checkbox" checked={form.accommodation} onChange={e => set('accommodation', e.target.checked)} className="accent-sky-500 w-4 h-4" /> Accommodation Required
            </label>
            {form.accommodation && (
              <F label="Accommodation Type">
                <S value={form.accommodationType} onChange={e => set('accommodationType', e.target.value)}>
                  <option>Shared Accommodation</option><option>Individual</option><option>Family</option>
                </S>
              </F>
            )}
          </div>
        </Section>
      </div>
    </div>
  );
}

// ─── 6. REPORTS PAGE (Enhanced) ────────────────────────────────────────────────
const CHART_COLORS = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444'];
const reportData = [
  { month: 'Jan', requisitions: 4, applications: 20, shortlisted: 8, selected: 2, joined: 1 },
  { month: 'Feb', requisitions: 6, applications: 35, shortlisted: 12, selected: 4, joined: 3 },
  { month: 'Mar', requisitions: 9, applications: 50, shortlisted: 20, selected: 6, joined: 5 },
  { month: 'Apr', requisitions: 7, applications: 42, shortlisted: 15, selected: 5, joined: 4 },
  { month: 'May', requisitions: 12, applications: 65, shortlisted: 25, selected: 8, joined: 7 },
  { month: 'Jun', requisitions: 10, applications: 58, shortlisted: 22, selected: 7, joined: 6 },
];
const pipelineData = [
  { name: 'Applied', value: 270, fill: '#6366f1' },
  { name: 'Shortlisted', value: 102, fill: '#0ea5e9' },
  { name: 'Interviewed', value: 48, fill: '#10b981' },
  { name: 'Selected', value: 32, fill: '#f59e0b' },
  { name: 'Joined', value: 26, fill: '#ef4444' },
];

export function FullReportsPage() {
  const [activeReport, setActiveReport] = useState('overview');
  const REPORT_TYPES = [
    { id: 'overview', label: 'Overview', icon: BarChart2 },
    { id: 'pipeline', label: 'Pipeline', icon: TrendingUp },
    { id: 'hiring', label: 'Hiring Trends', icon: Activity },
  ];

  const KPI = ({ label, value, sub, delta, up }) => (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">{label}</p>
      <p className="text-3xl font-bold text-slate-800 mb-1">{value}</p>
      <div className="flex items-center gap-1.5">
        {delta && <span className={`flex items-center gap-0.5 text-xs font-semibold ${up ? 'text-green-600' : 'text-red-600'}`}>
          {up ? <ArrowUp size={12} /> : <ArrowDown size={12} />}{delta}
        </span>}
        <span className="text-xs text-slate-400">{sub}</span>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-800">Reports & Analytics</h1><p className="text-sm text-slate-400 mt-0.5">Comprehensive hiring insights for your company</p></div>
        <div className="flex gap-2">
          <button onClick={() => {
            const csv = 'Month,Requisitions,Applications,Shortlisted,Selected,Joined\n' + reportData.map(r => `${r.month},${r.requisitions},${r.applications},${r.shortlisted},${r.selected},${r.joined}`).join('\n');
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a'); a.href = url; a.download = 'hiring_report.csv'; a.click();
          }} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white hover:opacity-90" style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)' }}>
            <Download size={15} /> Export CSV
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPI label="Total Applications" value="270" sub="This year" delta="+18%" up />
        <KPI label="Shortlisted" value="102" sub="37.7% conversion" delta="+5%" up />
        <KPI label="Selected" value="32" sub="31.3% from shortlisted" delta="+12%" up />
        <KPI label="Joined" value="26" sub="81.2% offer accept" delta="-3%" up={false} />
      </div>

      {/* Tab Selection */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        {REPORT_TYPES.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActiveReport(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeReport === id ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
            <Icon size={14} />{label}
          </button>
        ))}
      </div>

      {activeReport === 'overview' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="font-semibold text-slate-700 mb-4">Monthly Hiring Overview (2026)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reportData} barSize={14} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="applications" fill="#e0e7ff" radius={[4,4,0,0]} name="Applications" />
              <Bar dataKey="shortlisted" fill="#0ea5e9" radius={[4,4,0,0]} name="Shortlisted" />
              <Bar dataKey="selected" fill="#6366f1" radius={[4,4,0,0]} name="Selected" />
              <Bar dataKey="joined" fill="#10b981" radius={[4,4,0,0]} name="Joined" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeReport === 'pipeline' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="font-semibold text-slate-700 mb-4">Candidate Pipeline Funnel</h2>
            <ResponsiveContainer width="100%" height={280}>
              <RechartsPie>
                <Pie data={pipelineData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                  {pipelineData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
                <Tooltip />
              </RechartsPie>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="font-semibold text-slate-700 mb-4">Stage Breakdown</h2>
            <div className="space-y-4">
              {pipelineData.map(({ name, value, fill }) => (
                <div key={name}>
                  <div className="flex justify-between text-sm mb-1"><span className="text-slate-600">{name}</span><span className="font-bold text-slate-800">{value}</span></div>
                  <div className="h-2 bg-slate-100 rounded-full"><div className="h-2 rounded-full" style={{ width: `${(value / 270) * 100}%`, background: fill }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeReport === 'hiring' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="font-semibold text-slate-700 mb-4">Requisitions vs Joined Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={reportData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line type="monotone" dataKey="requisitions" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4 }} name="Requisitions" />
              <Line type="monotone" dataKey="applications" stroke="#0ea5e9" strokeWidth={2.5} dot={{ r: 4 }} name="Applications" />
              <Line type="monotone" dataKey="joined" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} name="Joined" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Downloadable report list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Requisition Summary', desc: 'All TRs and their status' },
          { label: 'Candidate Pipeline', desc: 'Stage-wise breakdown' },
          { label: 'Offer & Joining', desc: 'Offer acceptance rates' },
          { label: 'Interview Report', desc: 'Interview feedback summary' },
        ].map(({ label, desc }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:border-sky-200 cursor-pointer transition-all group">
            <BarChart2 size={20} className="text-sky-500 mb-3" />
            <p className="font-semibold text-slate-700 text-sm mb-1">{label}</p>
            <p className="text-xs text-slate-400 mb-3">{desc}</p>
            <div className="flex items-center gap-1 text-xs text-sky-600 font-medium group-hover:gap-2 transition-all">
              <Download size={12} /> Download CSV
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 7. PROFILE PAGE (Functional) ─────────────────────────────────────────────
export function FullProfilePage() {
  const { currentUser, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [changingPwd, setChangingPwd] = useState(false);
  const [form, setForm] = useState({ name: currentUser?.name || '', email: currentUser?.email || '', mobile: '', company: '', designation: '' });
  const [pwdForm, setPwdForm] = useState({ current: '', newPwd: '', confirm: '' });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setForm({ name: currentUser?.name || 'Client Admin', email: currentUser?.email || '', mobile: '', company: '', designation: '' });
  }, [currentUser]);

  const showToast = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800)); // simulate API
    showToast('Profile updated successfully');
    setSaving(false);
    setEditing(false);
  };

  const handlePwdChange = async () => {
    if (pwdForm.newPwd !== pwdForm.confirm) { showToast('Passwords do not match', 'error'); return; }
    if (pwdForm.newPwd.length < 6) { showToast('Password must be at least 6 characters', 'error'); return; }
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    showToast('Password changed successfully');
    setSaving(false);
    setChangingPwd(false);
    setPwdForm({ current: '', newPwd: '', confirm: '' });
  };

  const initials = form.name ? form.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'CA';

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {toast && <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium flex items-center gap-2 ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}><CheckCircle size={16} />{toast.msg}</div>}

      <div className="mb-6"><h1 className="text-2xl font-bold text-slate-800">My Profile</h1><p className="text-sm text-slate-400 mt-0.5">Manage your account and preferences</p></div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-4">
        {/* Cover */}
        <div className="h-24" style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)' }} />
        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-8 mb-5">
            <div className="w-16 h-16 rounded-2xl border-4 border-white flex items-center justify-center text-white font-bold text-xl shadow-md" style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)' }}>
              {initials}
            </div>
            <div className="pb-1 flex-1">
              <h2 className="text-xl font-bold text-slate-800">{form.name}</h2>
              <p className="text-slate-400 text-sm">{form.email}</p>
            </div>
            <div className="flex gap-2 pb-1">
              <span className="flex items-center gap-1 px-3 py-1 bg-sky-50 text-sky-600 text-xs font-semibold rounded-full"><Shield size={11} /> Client Admin</span>
              {!editing && <button onClick={() => setEditing(true)} className="px-4 py-1.5 rounded-xl text-sm font-medium text-white hover:opacity-90" style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)' }}>Edit Profile</button>}
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-4">
            {[
              { icon: User, label: 'Full Name', key: 'name', type: 'text', placeholder: 'Your full name' },
              { icon: Mail, label: 'Email Address', key: 'email', type: 'email', placeholder: 'you@company.com', disabled: true },
              { icon: Phone, label: 'Mobile Number', key: 'mobile', type: 'tel', placeholder: '+91 98765 43210' },
              { icon: Building2, label: 'Company', key: 'company', type: 'text', placeholder: 'Your company name' },
              { icon: Briefcase, label: 'Designation', key: 'designation', type: 'text', placeholder: 'Your role / title' },
            ].map(({ icon: Icon, label, key, type, placeholder, disabled }) => (
              <div key={key} className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0"><Icon size={16} className="text-slate-400" /></div>
                <div className="flex-1">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{label}</label>
                  {editing && !disabled ? (
                    <input type={type} value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} placeholder={placeholder}
                      className="w-full mt-1 px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200" />
                  ) : (
                    <p className={`text-sm mt-0.5 ${form[key] ? 'text-slate-700' : 'text-slate-300'}`}>{form[key] || placeholder}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {editing && (
            <div className="flex gap-3 mt-6 pt-4 border-t border-slate-100">
              <button onClick={() => setEditing(false)} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white disabled:opacity-60 flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)' }}>
                {saving ? 'Saving…' : <><Save size={14} /> Save Changes</>}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div><h3 className="font-semibold text-slate-800">Password & Security</h3><p className="text-xs text-slate-400 mt-0.5">Manage your account password</p></div>
          {!changingPwd && <button onClick={() => setChangingPwd(true)} className="px-4 py-2 rounded-xl text-sm font-medium border border-slate-200 text-slate-600 hover:bg-slate-50">Change Password</button>}
        </div>
        {changingPwd && (
          <div className="space-y-4">
            {[['Current Password', 'current'], ['New Password', 'newPwd'], ['Confirm New Password', 'confirm']].map(([label, key]) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">{label}</label>
                <input type="password" value={pwdForm[key]} onChange={e => setPwdForm(p => ({ ...p, [key]: e.target.value }))} placeholder="••••••••"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200" />
              </div>
            ))}
            <div className="flex gap-3">
              <button onClick={() => { setChangingPwd(false); setPwdForm({ current: '', newPwd: '', confirm: '' }); }} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50">Cancel</button>
              <button onClick={handlePwdChange} disabled={saving} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white disabled:opacity-60" style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)' }}>
                {saving ? 'Updating…' : 'Update Password'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6">
        <h3 className="font-semibold text-red-700 mb-2">Danger Zone</h3>
        <p className="text-sm text-slate-500 mb-4">Sign out of your account on this device</p>
        <button onClick={logout} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-red-600 border border-red-200 hover:bg-red-50 transition-colors">
          <LogOut size={15} /> Sign Out
        </button>
      </div>
    </div>
  );
}
