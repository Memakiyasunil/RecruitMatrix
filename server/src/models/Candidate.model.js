const mongoose = require('mongoose');

// Section 14 — Candidate Master Structure
const candidateSchema = new mongoose.Schema({
  candidateId:       { type: String, unique: true },
  name:              { type: String, required: true },
  mobile:            { type: String, required: true },
  email:             { type: String, lowercase: true },
  currentLocation:   { type: String },
  positionApplied:   { type: String },
  resume:            { type: String }, // file URL
  currentCompany:    { type: String },
  totalExperience:   { type: Number }, // in months
  relevantExperience:{ type: Number }, // in months
  currentCTC:        { type: Number },
  expectedCTC:       { type: Number },
  noticePeriod:      { type: Number }, // in days
  skills:            [{ type: String }],
  education:         [{ degree: String, institution: String, year: Number }],
  certification:     [{ name: String, issuer: String, year: Number }],
  source:            { type: String, enum: ['naukri', 'linkedin', 'referral', 'walk_in', 'database', 'website', 'other'] },
  status:            { type: String, enum: ['active', 'inactive', 'blacklisted'], default: 'active' },

  // Notes per stage
  recruiterNotes:    { type: String },
  screeningNotes:    { type: String },
  interviewNotes:    { type: String },
  offerNotes:        { type: String },
  joiningNotes:      { type: String },

  // Meta
  addedBy:           { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);
