const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeId: { type: String }, // Internal company ID
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  userAccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to login auth
  
  personalInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String },
    gender: String,
    dob: Date,
    mobile: String,
    email: { type: String, required: true }
  },
  
  officialInfo: {
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'CompanyDepartment' },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'CompanyTeam' },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'CompanyEmployeeRole' },
    designation: String,
    reportingManager: { type: mongoose.Schema.Types.ObjectId, ref: 'CompanyEmployee' },
    joiningDate: Date,
    employmentStatus: { type: String, enum: ['Full-Time', 'Part-Time', 'Contract', 'Intern'] }
  },

  status: { type: String, enum: ['Active', 'Inactive', 'Deleted'], default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('CompanyEmployee', employeeSchema);
