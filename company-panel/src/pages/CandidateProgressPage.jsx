import React from 'react';
import { Eye } from 'lucide-react';

const candidates = [
  { name: 'Rahul Sharma', position: 'Senior Developer', stage: 'interviewing', team: 'Team A', interviewDate: '05-Jul-2026', offerStatus: 'Pending', joiningStatus: '-' },
  { name: 'Priya Patel', position: 'HR Manager', stage: 'shortlisting', team: 'Team B', interviewDate: '-', offerStatus: '-', joiningStatus: '-' },
  { name: 'Amit Kumar', position: 'Sales Executive', stage: 'offered', team: 'Team A', interviewDate: '02-Jul-2026', offerStatus: 'Accepted', joiningStatus: 'Pending' },
  { name: 'Neha Singh', position: 'QA Engineer', stage: 'selected', team: 'Team B', interviewDate: '01-Jul-2026', offerStatus: '-', joiningStatus: '-' },
  { name: 'Rohan Gupta', position: 'Finance Analyst', stage: 'joined', team: 'Team A', interviewDate: '25-Jun-2026', offerStatus: 'Accepted', joiningStatus: 'Joined' },
];

const STAGE_COLORS = { not_started:'bg-gray-100 text-gray-600', screening:'bg-blue-100 text-blue-700', shortlisting:'bg-yellow-100 text-yellow-700', interviewing:'bg-purple-100 text-purple-700', selected:'bg-green-100 text-green-700', offered:'bg-indigo-100 text-indigo-700', joined:'bg-emerald-100 text-emerald-700', offer_withdrawn:'bg-red-100 text-red-700' };

export default function CandidateProgressPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Candidate Progress</h1>
        <p className="text-sm text-slate-400 mt-1">Track all candidates across all your positions</p>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>{['Candidate Name','Position','Current Stage','Team','Interview Date','Offer Status','Joining Status','Action'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {candidates.map((c, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-800">{c.name}</td>
                  <td className="px-4 py-3 text-slate-600">{c.position}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${STAGE_COLORS[c.stage]}`}>{c.stage.replace('_',' ')}</span></td>
                  <td className="px-4 py-3 text-slate-500">{c.team}</td>
                  <td className="px-4 py-3 text-slate-500">{c.interviewDate}</td>
                  <td className="px-4 py-3 text-slate-600">{c.offerStatus}</td>
                  <td className="px-4 py-3 text-slate-600">{c.joiningStatus}</td>
                  <td className="px-4 py-3"><button className="p-1.5 text-slate-400 hover:text-sky-500 hover:bg-sky-50 rounded-lg"><Eye size={15} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
