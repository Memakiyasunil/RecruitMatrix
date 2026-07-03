import React, { useState } from 'react';
import { Save, Send, ChevronDown } from 'lucide-react';

// Section 12 — Full Talent Requisition Form
const Field = ({ label, children, required }) => (
  <div>
    <label className="block text-xs font-semibold text-slate-600 mb-1.5">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
    {children}
  </div>
);

const Input = (props) => (
  <input {...props} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 bg-white transition-all" />
);

const Select = ({ children, ...props }) => (
  <select {...props} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 bg-white transition-all appearance-none">
    {children}
  </select>
);

const Textarea = (props) => (
  <textarea {...props} rows={3} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 bg-white transition-all resize-none" />
);

export default function CreateRequisitionPage() {
  const [accommodation, setAccommodation] = useState(false);
  const [formData, setFormData] = useState({
    positionName: '', department: '', vacancies: 1, description: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.positionName.trim()) newErrors.positionName = 'Required';
    if (!formData.department.trim()) newErrors.department = 'Required';
    if (formData.vacancies < 1) newErrors.vacancies = 'Must be > 0';
    if (!formData.description.trim()) newErrors.description = 'Required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Requisition submitted successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Create Talent Requisition</h1>
          <p className="text-sm text-slate-400 mt-1">Fill in all required details for the position</p>
        </div>
        <div className="flex gap-3">
          <button type="button" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
            <Save size={15} /> Save Draft
          </button>
          <button type="submit" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white hover:opacity-90 transition-all"
            style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)' }}>
            <Send size={15} /> Submit Requisition
          </button>
        </div>
      </div>

      {/* Section 1: Basic Info */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="font-semibold text-slate-700 mb-4 pb-3 border-b border-slate-100">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Position Name" required>
            <Input type="text" placeholder="e.g. Senior Developer" value={formData.positionName} onChange={e => setFormData({...formData, positionName: e.target.value})} className={errors.positionName ? 'border-red-500 w-full px-3 py-2.5 rounded-xl text-sm' : 'w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 bg-white transition-all'} />
            {errors.positionName && <p className="text-xs text-red-500 mt-1">{errors.positionName}</p>}
          </Field>
          <Field label="Position Code"><Input type="text" placeholder="e.g. POS-001" /></Field>
          <Field label="Business / Department" required>
            <Input type="text" placeholder="Department name" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} className={errors.department ? 'border-red-500 w-full px-3 py-2.5 rounded-xl text-sm' : 'w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 bg-white transition-all'} />
            {errors.department && <p className="text-xs text-red-500 mt-1">{errors.department}</p>}
          </Field>
          <Field label="No. of Vacancies" required>
            <Input type="number" min={1} value={formData.vacancies} onChange={e => setFormData({...formData, vacancies: e.target.value})} className={errors.vacancies ? 'border-red-500 w-full px-3 py-2.5 rounded-xl text-sm' : 'w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 bg-white transition-all'} />
            {errors.vacancies && <p className="text-xs text-red-500 mt-1">{errors.vacancies}</p>}
          </Field>
          <Field label="Priority">
            <Select>
              <option value="low">Low</option><option value="medium">Medium</option>
              <option value="high">High</option><option value="critical">Critical</option>
            </Select>
          </Field>
          <Field label="Service Type">
            <Select>
              <option>Office</option><option>Office + Field</option>
              <option>Field</option><option>Traveling</option>
            </Select>
          </Field>
          <Field label="Work Mode">
            <Select>
              <option>Office</option><option>Office + Home</option>
              <option>Home</option><option>Deputation</option><option>Office + Deputation</option>
            </Select>
          </Field>
          <Field label="Employment Type">
            <Select><option>Full Time</option><option>Part Time</option><option>Hourly</option></Select>
          </Field>
        </div>
        <div className="mt-4">
          <Field label="Position Details / JD" required>
            <Textarea placeholder="Describe the role, responsibilities, and expectations..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className={errors.description ? 'border-red-500 w-full px-3 py-2.5 rounded-xl text-sm resize-none' : 'w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 bg-white transition-all resize-none'} />
            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
          </Field>
        </div>
      </div>

      {/* Section 2: Salary & Contract */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="font-semibold text-slate-700 mb-4 pb-3 border-b border-slate-100">Salary & Contract</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Field label="Salary Range From"><Input type="number" placeholder="Min CTC" /></Field>
          <Field label="Salary Range To"><Input type="number" placeholder="Max CTC" /></Field>
          <Field label="TAT Days"><Input type="number" placeholder="Days to close" /></Field>
          <Field label="TAT Date"><Input type="date" /></Field>
          <Field label="Contract Type">
            <Select><option>Permanent</option><option>Contractual</option><option>Fixed Term</option></Select>
          </Field>
          <Field label="Contract Duration (months)"><Input type="number" placeholder="For fixed term" /></Field>
        </div>
        <div className="mt-4">
          <label className="block text-xs font-semibold text-slate-600 mb-2">Compensation Components</label>
          <div className="flex flex-wrap gap-3">
            {['Salary','PF','Commission','Incentive','Health Coverage','Variable Pay'].map(c => (
              <label key={c} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded accent-sky-500" /> {c}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Section 3: Requirements */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="font-semibold text-slate-700 mb-4 pb-3 border-b border-slate-100">Requirements</h2>
        {[['Education', 'education'],['Experience', 'experience'],['Certification', 'cert'],['Requirement 1','req1'],['Requirement 2','req2'],['Requirement 3','req3']].map(([label, key]) => (
          <div key={key} className="grid grid-cols-3 gap-3 mb-3 items-center">
            <label className="text-sm text-slate-600">{label}</label>
            <Input type="text" placeholder={`Specify ${label.toLowerCase()}`} className="col-span-1" />
            <Select><option value="must">Must Have</option><option value="preferred">Preferred</option></Select>
          </div>
        ))}
      </div>

      {/* Section 4: Location & Travel */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="font-semibold text-slate-700 mb-4 pb-3 border-b border-slate-100">Location & Travel</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Field label="City"><Input type="text" placeholder="Work city" /></Field>
          <Field label="District"><Input type="text" placeholder="District" /></Field>
          <Field label="State"><Input type="text" placeholder="State" /></Field>
        </div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" className="accent-sky-500 w-4 h-4" /> Domestic Travel</label>
          <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" className="accent-sky-500 w-4 h-4" /> International Travel</label>
        </div>
      </div>

      {/* Section 5: Accommodation */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="font-semibold text-slate-700 mb-4 pb-3 border-b border-slate-100">Documents & Accommodation</h2>
        <Field label="Documents Required"><Textarea placeholder="List documents required for this position..." /></Field>
        <div className="mt-4">
          <label className="flex items-center gap-2 text-sm cursor-pointer mb-3">
            <input type="checkbox" className="accent-sky-500 w-4 h-4" onChange={e => setAccommodation(e.target.checked)} /> Accommodation Required
          </label>
          {accommodation && (
            <Field label="Accommodation Type">
              <Select><option>Shared Accommodation</option><option>Individual</option><option>Family</option></Select>
            </Field>
          )}
        </div>
      </div>
    </form>
  );
}
