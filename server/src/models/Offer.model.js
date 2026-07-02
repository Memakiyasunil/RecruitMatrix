const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  pipeline:     { type: mongoose.Schema.Types.ObjectId, ref: 'CandidatePipeline', required: true },
  candidate:    { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
  requisition:  { type: mongoose.Schema.Types.ObjectId, ref: 'TalentRequisition', required: true },
  client:       { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  offeredSalary:{ type: Number },
  offerDate:    { type: Date },
  joiningDate:  { type: Date },
  status:       { type: String, enum: ['pending', 'accepted', 'rejected', 'withdrawn', 'expired'], default: 'pending' },
  offerLetter:  { type: String }, // file URL
  notes:        { type: String },
  preparedBy:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  approvedBy:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Offer', offerSchema);
