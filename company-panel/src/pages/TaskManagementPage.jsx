import React, { useState } from 'react';
import { ClipboardList, Plus, Search, Filter, MessageSquare, CheckCircle, Clock } from 'lucide-react';

export default function TaskManagementPage() {
  const [activeTab, setActiveTab] = useState('My Tasks');

  const tasks = [
    { id: 'TSK-001', title: 'Review Q3 Technical Assessments', priority: 'High', status: 'Pending', assignee: 'Technical Manager', due: '2026-07-05' },
    { id: 'TSK-002', title: 'Onboard new Junior Devs', priority: 'Medium', status: 'In Progress', assignee: 'HR Manager', due: '2026-07-03' },
    { id: 'TSK-003', title: 'Refactor Core Backend API', priority: 'Critical', status: 'Completed', assignee: 'Senior Developer', due: '2026-07-01' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Task Management</h1>
          <p className="text-slate-500 text-sm mt-1">Assign, track, and manage hierarchical work</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors shadow-sm">
          <Plus size={18} /> Create Task
        </button>
      </div>

      <div className="flex gap-4 mb-6 border-b border-slate-200">
        {['My Tasks', 'Team Tasks', 'Task Dashboard'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-2 text-sm font-medium transition-colors ${
              activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors">
            <Filter size={16} /> Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase text-[11px] font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4">Task</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Assigned To</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tasks.map(task => (
                <tr key={task.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-800">{task.title}</p>
                    <p className="text-xs text-slate-400">{task.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      task.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                      task.priority === 'High' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold">
                      {task.assignee.charAt(0)}
                    </div>
                    {task.assignee}
                  </td>
                  <td className="px-6 py-4 text-slate-500 flex items-center gap-1">
                    <Clock size={14} /> {task.due}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-max ${
                      task.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      task.status === 'In Progress' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {task.status === 'Completed' && <CheckCircle size={12} />}
                      {task.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
