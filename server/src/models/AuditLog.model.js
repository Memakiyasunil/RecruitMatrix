const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action:     { type: String, required: true }, // e.g. 'CREATED', 'UPDATED', 'DELETED', 'APPROVED', 'LOGIN'
  module:     { type: String, required: true }, // e.g. 'TalentRequisition', 'User', 'Client'
  recordId:   { type: mongoose.Schema.Types.ObjectId },
  recordRef:  { type: String }, // human-readable ref e.g. TR-001
  changes:    { type: Object }, // { field: { old, new } }
  ipAddress:  { type: String },
  userAgent:  { type: String },
  panel:      { type: String, enum: ['admin', 'company'] },
}, { timestamps: true });

module.exports = mongoose.model('AuditLog', auditLogSchema);
