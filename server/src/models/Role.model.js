const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  module:  { type: String, required: true },
  actions: { type: [String], enum: ['view','add','edit','delete','approve','reject','allocate','export','import','assign','close','reopen'], default: [] },
}, { _id: false });

const roleSchema = new mongoose.Schema({
  name:        { type: String, required: true, unique: true },
  code:        { type: String, required: true, unique: true }, // e.g. 'super_admin', 'recruiter'
  panel:       { type: String, enum: ['admin', 'company'], required: true },
  description: { type: String },
  permissions: { type: [permissionSchema], default: [] },
  isSystem:    { type: Boolean, default: false }, // system roles cannot be deleted
  status:      { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('Role', roleSchema);
