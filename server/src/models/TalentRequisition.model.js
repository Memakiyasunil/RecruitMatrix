const mongoose = require('mongoose');

// Section 12 — Full Talent Requisition structure
const talentRequisitionSchema = new mongoose.Schema({
  // Basic Information (Section 12.1)
  requestNumber:  { type: String, unique: true },
  client:         { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  business:       { type: String },
  positionName:   { type: String, required: true },
  positionCode:   { type: String },
  positionDetails:{ type: String }, // JD
  vacancies:      { type: Number, default: 1 },
  priority:       { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
  serviceType:    { type: String, enum: ['office', 'office_field', 'field', 'traveling'] },
  workMode:       { type: String, enum: ['office', 'office_home', 'home', 'deputation', 'office_deputation'] },

  // Salary / Contract (Section 12.2)
  salaryFrom:     { type: Number },
  salaryTo:       { type: Number },
  tatDays:        { type: Number },
  tatDate:        { type: Date },
  employmentType: { type: String, enum: ['full_time', 'part_time', 'hourly'] },
  contractType:   { type: String, enum: ['permanent', 'contractual', 'fixed_term'] },
  contractMonths: { type: Number }, // for fixed_term
  compensation:   [{ type: String, enum: ['salary','pf','commission','incentive','health_coverage','variable_pay'] }],

  // Requirement Information (Section 12.3)
  educationReq:    { value: String, mustPreferred: { type: String, enum: ['must','preferred'] } },
  experienceReq:   { value: String, mustPreferred: { type: String, enum: ['must','preferred'] } },
  certificationReq:{ value: String, mustPreferred: { type: String, enum: ['must','preferred'] } },
  requirement1:    { value: String, mustPreferred: { type: String, enum: ['must','preferred'] } },
  requirement2:    { value: String, mustPreferred: { type: String, enum: ['must','preferred'] } },
  requirement3:    { value: String, mustPreferred: { type: String, enum: ['must','preferred'] } },

  // Location / Travel (Section 12.4)
  locationCity:     { type: String },
  locationDistrict: { type: String },
  locationState:    { type: String },
  domesticTravel:   { type: Boolean, default: false },
  internationalTravel:{ type: Boolean, default: false },

  // Documents / Facility / Accommodation (Section 12.5)
  documentsRequired: [{ type: String }],
  facility:          [{ type: String }],
  accommodation:     { type: Boolean, default: false },
  accommodationType: { type: String, enum: ['shared', 'individual', 'family'] },

  // Workflow (Section 12.6)
  approvalStatus:   { type: String, enum: ['draft', 'pending', 'approved', 'rejected', 'closed'], default: 'draft' },
  rejectionNote:    { type: String },
  assignedManager:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedRecruiters:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  currentStage:     { type: String, default: 'not_started' },
  createdBy:        { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  approvedBy:       { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  approvedAt:       { type: Date },

  // Source panel
  sourcePanel:      { type: String, enum: ['admin', 'company'], default: 'admin' },
  companyUser:      { type: mongoose.Schema.Types.ObjectId, ref: 'CompanyUser' },
}, { timestamps: true });

module.exports = mongoose.model('TalentRequisition', talentRequisitionSchema);
