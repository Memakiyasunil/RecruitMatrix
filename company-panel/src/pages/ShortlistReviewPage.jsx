import React from 'react';
import { ThumbsUp, ThumbsDown, Eye } from 'lucide-react';

const candidates = [
  { name: 'Rahul Sharma', position: 'Senior Developer', exp: '7 yrs', ctc: '12 LPA', expectedCtc: '18 LPA', skills: ['React','Node.js','MongoDB'], status: 'pending_review' },
  { name: 'Meera Iyer', position: 'Senior Developer', exp: '5 yrs', ctc: '10 LPA', expectedCtc: '15 LPA', skills: ['Angular','Java','MySQL'], status: 'shortlisted' },
  { name: 'Karan Mehta', position: 'QA Engineer', exp: '4 yrs', ctc: '8 LPA', expectedCtc: '12 LPA', skills: ['Selenium','JIRA','Postman'], status: 'pending_review' },
];

export default function ShortlistReviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Shortlist Review</h1>
        <p className="text-sm text-slate-400 mt-1">Review and approve shortlisted candidates from your team</p>
      </div>
      <div className="space-y-4">
        {candidates.map((c, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)' }}>
                  {c.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{c.name}</p>
                  <p className="text-xs text-slate-400">{c.position}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.status === 'shortlisted' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {c.status.replace('_', ' ')}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500 pl-13">
                <span>Exp: <strong className="text-slate-700">{c.exp}</strong></span>
                <span>CTC: <strong className="text-slate-700">{c.ctc}</strong></span>
                <span>Expected: <strong className="text-slate-700">{c.expectedCtc}</strong></span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2 pl-0">
                {c.skills.map(s => <span key={s} className="px-2 py-0.5 bg-sky-50 text-sky-600 text-xs rounded-lg">{s}</span>)}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="p-2 text-slate-400 hover:text-sky-500 hover:bg-sky-50 rounded-xl"><Eye size={16} /></button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-green-600 bg-green-50 rounded-xl hover:bg-green-100"><ThumbsUp size={14} /> Approve</button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 bg-red-50 rounded-xl hover:bg-red-100"><ThumbsDown size={14} /> Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
