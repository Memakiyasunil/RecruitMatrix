const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., 'CEO', 'HR Manager', 'Senior Developer'
  description: String,
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true }, // Scoped to company
  permissions: {
    canManageEmployees: { type: Boolean, default: false },
    canAssignTaskDownward: { type: Boolean, default: false },
    canAssignTaskAll: { type: Boolean, default: false },
    canApproveTask: { type: Boolean, default: false },
    canViewAllTasks: { type: Boolean, default: false },
    canViewTeamTasks: { type: Boolean, default: false }
  },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('CompanyEmployeeRole', roleSchema);
