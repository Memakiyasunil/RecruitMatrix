const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'CompanyDepartment' },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('CompanyTeam', teamSchema);
