const mongoose = require('mongoose');

const deptSchema = new mongoose.Schema({
  name: { type: String, required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('CompanyDepartment', deptSchema);
