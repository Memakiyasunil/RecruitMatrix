import React from 'react';
import { Upload, FileText, Download, Trash2 } from 'lucide-react';

const docs = [
  { name: 'Company Registration.pdf', size: '2.3 MB', uploaded: '01-Jun-2026', type: 'Registration' },
  { name: 'MOA Agreement.pdf', size: '1.1 MB', uploaded: '05-Jun-2026', type: 'Legal' },
  { name: 'HR Policy 2026.pdf', size: '800 KB', uploaded: '10-Jun-2026', type: 'Policy' },
];

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-800">Documents</h1><p className="text-sm text-slate-400 mt-1">Manage company documents</p></div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white hover:opacity-90" style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)' }}>
          <Upload size={15} /> Upload Document
        </button>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50"><tr>{['File Name','Type','Size','Uploaded','Actions'].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-slate-50">
              {docs.map((d, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3"><div className="flex items-center gap-3"><FileText size={16} className="text-sky-500 flex-shrink-0" /><span className="font-medium text-slate-700">{d.name}</span></div></td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 bg-sky-50 text-sky-700 text-xs rounded-lg">{d.type}</span></td>
                  <td className="px-4 py-3 text-slate-500">{d.size}</td>
                  <td className="px-4 py-3 text-slate-400">{d.uploaded}</td>
                  <td className="px-4 py-3"><div className="flex items-center gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-sky-500 hover:bg-sky-50 rounded-lg"><Download size={14} /></button>
                    <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
