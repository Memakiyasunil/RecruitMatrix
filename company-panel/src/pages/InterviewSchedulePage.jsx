import React from 'react';
import { Calendar, Video, MapPin, MessageSquare } from 'lucide-react';

const interviews = [
  { candidate: 'Rahul Sharma', position: 'Senior Developer', round: 1, interviewer: 'Sunil K.', date: '05-Jul-2026', time: '11:00 AM', mode: 'video', status: 'scheduled', feedback: '' },
  { candidate: 'Priya Patel', position: 'HR Manager', round: 2, interviewer: 'Anita M.', date: '06-Jul-2026', time: '3:00 PM', mode: 'in_person', status: 'completed', feedback: 'Strong candidate, recommended.' },
  { candidate: 'Karan Mehta', position: 'QA Engineer', round: 1, interviewer: 'Raj S.', date: '07-Jul-2026', time: '10:00 AM', mode: 'video', status: 'scheduled', feedback: '' },
];
const STATUS_COLORS = { scheduled: 'bg-sky-100 text-sky-700', completed: 'bg-green-100 text-green-700', rescheduled: 'bg-yellow-100 text-yellow-700', cancelled: 'bg-red-100 text-red-700' };

export default function InterviewSchedulePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Interview Schedule</h1>
        <p className="text-sm text-slate-400 mt-1">View upcoming and completed interviews</p>
      </div>
      <div className="space-y-4">
        {interviews.map((iv, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <p className="font-semibold text-slate-800">{iv.candidate}</p>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_COLORS[iv.status]}`}>{iv.status}</span>
                  <span className="text-xs text-slate-400">Round {iv.round}</span>
                </div>
                <p className="text-sm text-slate-500">{iv.position} • Interviewer: {iv.interviewer}</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1.5"><Calendar size={14} /> {iv.date}</span>
                <span className="text-slate-400">{iv.time}</span>
                <span className="flex items-center gap-1.5">{iv.mode === 'video' ? <Video size={14} /> : <MapPin size={14} />} {iv.mode.replace('_', ' ')}</span>
              </div>
            </div>
            {iv.feedback && (
              <div className="mt-3 p-3 bg-slate-50 rounded-xl flex items-start gap-2">
                <MessageSquare size={14} className="text-slate-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-600">{iv.feedback}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
