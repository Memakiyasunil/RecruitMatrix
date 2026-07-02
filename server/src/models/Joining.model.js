const mongoose = require('mongoose');

const joiningSchema = new mongoose.Schema({
  offer:       { type: mongoose.Schema.Types.ObjectId, ref: 'Offer', required: true },
  candidate:   { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
  requisition: { type: mongoose.Schema.Types.ObjectId, ref: 'TalentRequisition', required: true },
  client:      { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  recruiter:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  joiningDate: { type: Date },
  status:      { type: String, enum: ['pending', 'joined', 'no_show', 'on_hold', 'postponed'], default: 'pending' },
  notes:       { type: String },
  followUpDate:{ type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Joining', joiningSchema);
