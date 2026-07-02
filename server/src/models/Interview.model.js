const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  pipeline:    { type: mongoose.Schema.Types.ObjectId, ref: 'CandidatePipeline', required: true },
  candidate:   { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
  requisition: { type: mongoose.Schema.Types.ObjectId, ref: 'TalentRequisition', required: true },
  client:      { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  round:       { type: Number, default: 1 },
  interviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  clientInterviewer: { type: String }, // external interviewer name
  scheduledAt: { type: Date, required: true },
  duration:    { type: Number }, // minutes
  mode:        { type: String, enum: ['in_person', 'video', 'phone'], default: 'video' },
  meetingLink: { type: String },
  status:      { type: String, enum: ['scheduled', 'completed', 'rescheduled', 'cancelled', 'no_show'], default: 'scheduled' },
  feedback:    { type: String },
  rating:      { type: Number, min: 1, max: 5 },
  result:      { type: String, enum: ['selected', 'rejected', 'on_hold', 'pending'] },
  scheduledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Interview', interviewSchema);
