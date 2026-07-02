import React from 'react';
import { Award, Eye } from 'lucide-react';

const selected = [
  { name: 'Priya Patel', position: 'HR Manager', client: 'Acme Corp', selectionDate: '03-Jul-2026', offeredSalary: '14 LPA', joiningDate: '15-Jul-2026', status: 'offer_pending' },
  { name: 'Rohan Gupta', position: 'Finance Analyst', client: 'Acme Corp', selectionDate: '01-Jul-2026', offeredSalary: '10 LPA', joiningDate: '10-Jul-2026', status: 'joined' },
  { name: 'Neha Singh', position: 'QA Engineer', client: 'Acme Corp', selectionDate: '02-Jul-2026', offeredSalary: '11 LPA', joiningDate: '18-Jul-2026', status: 'offer_accepted' },
];
const STATUS_MAP = { offer_pending:'bg-yellow-100 text-yellow-700', offer_accepted:'bg-blue-100 text-blue-700', joined:'bg-green-100 text-green-700', offer_rejected:'bg-red-100 text-red-700' };

const PageTemplate = ({ title, subtitle, data, columns, renderRow }) => (
  <div className="space-y-6">
    <div><h1 className="text-2xl font-bold text-slate-800">{title}</h1><p className="text-sm text-slate-400 mt-1">{subtitle}</p></div>
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50"><tr>{columns.map(c => <th key={c} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{c}</th>)}</tr></thead>
          <tbody className="divide-y divide-slate-50">{data.map((row, i) => renderRow(row, i))}</tbody>
        </table>
      </div>
    </div>
  </div>
);

export function SelectedCandidatesPage() {
  return (
    <PageTemplate title="Selected Candidates" subtitle="Candidates confirmed for selection"
      data={selected} columns={['Candidate','Position','Selection Date','Offered Salary','Joining Date','Status','Action']}
      renderRow={(r, i) => (
        <tr key={i} className="hover:bg-slate-50">
          <td className="px-4 py-3 font-medium text-slate-800">{r.name}</td>
          <td className="px-4 py-3 text-slate-600">{r.position}</td>
          <td className="px-4 py-3 text-slate-500">{r.selectionDate}</td>
          <td className="px-4 py-3 text-slate-700 font-medium">{r.offeredSalary}</td>
          <td className="px-4 py-3 text-slate-500">{r.joiningDate}</td>
          <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_MAP[r.status]}`}>{r.status.replace('_',' ')}</span></td>
          <td className="px-4 py-3"><button className="p-1.5 text-slate-400 hover:text-sky-500 hover:bg-sky-50 rounded-lg"><Eye size={15} /></button></td>
        </tr>
      )} />
  );
}

export function OfferStatusPage() {
  const offers = selected.map(s => ({ ...s, offerDate: s.selectionDate }));
  return (
    <PageTemplate title="Offer Status" subtitle="Track offer letters and responses"
      data={offers} columns={['Candidate','Position','Offered Salary','Offer Date','Joining Date','Status','Action']}
      renderRow={(r, i) => (
        <tr key={i} className="hover:bg-slate-50">
          <td className="px-4 py-3 font-medium text-slate-800">{r.name}</td>
          <td className="px-4 py-3 text-slate-600">{r.position}</td>
          <td className="px-4 py-3 font-medium text-slate-700">{r.offeredSalary}</td>
          <td className="px-4 py-3 text-slate-500">{r.offerDate}</td>
          <td className="px-4 py-3 text-slate-500">{r.joiningDate}</td>
          <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_MAP[r.status]}`}>{r.status.replace('_',' ')}</span></td>
          <td className="px-4 py-3"><button className="p-1.5 text-slate-400 hover:text-sky-500 hover:bg-sky-50 rounded-lg"><Eye size={15} /></button></td>
        </tr>
      )} />
  );
}

export function JoinedCandidatesPage() {
  const joined = selected.filter(s => s.status === 'joined');
  return (
    <PageTemplate title="Joined Candidates" subtitle="Candidates who have successfully joined"
      data={joined} columns={['Candidate','Position','Offered Salary','Selection Date','Joining Date','Status','Action']}
      renderRow={(r, i) => (
        <tr key={i} className="hover:bg-slate-50">
          <td className="px-4 py-3 font-medium text-slate-800">{r.name}</td>
          <td className="px-4 py-3 text-slate-600">{r.position}</td>
          <td className="px-4 py-3 font-medium text-slate-700">{r.offeredSalary}</td>
          <td className="px-4 py-3 text-slate-500">{r.selectionDate}</td>
          <td className="px-4 py-3 text-slate-500">{r.joiningDate}</td>
          <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Joined</span></td>
          <td className="px-4 py-3"><button className="p-1.5 text-slate-400 hover:text-sky-500 hover:bg-sky-50 rounded-lg"><Eye size={15} /></button></td>
        </tr>
      )} />
  );
}
