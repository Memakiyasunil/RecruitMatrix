const mongoose = require('mongoose');

// Section 13 — Candidate Pipeline Stages
const pipelineEntrySchema = new mongoose.Schema({
  stage:     { type: String, enum: ['not_started','screening','tagging','shortlisting','interviewing','selected','offered','offer_withdrawn','joined'], required: true },
  timestamp: { type: Date, default: Date.now },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  remarks:   { type: String },
}, { _id: false });

const candidatePipelineSchema = new mongoose.Schema({
  requisition:  { type: mongoose.Schema.Types.ObjectId, ref: 'TalentRequisition', required: true },
  candidate:    { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
  recruiter:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  currentStage: { type: String, enum: ['not_started','screening','tagging','shortlisting','interviewing','selected','offered','offer_withdrawn','joined'], default: 'not_started' },
  stageHistory: { type: [pipelineEntrySchema], default: [] },
  activityLog:  [{ action: String, by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, at: Date, note: String }],
  isActive:     { type: Boolean, default: true },
}, { timestamps: true });

candidatePipelineSchema.index({ requisition: 1, candidate: 1 }, { unique: true });

module.exports = mongoose.model('CandidatePipeline', candidatePipelineSchema);
