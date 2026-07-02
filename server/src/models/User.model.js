const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  employeeCode: { type: String, unique: true },
  name:         { type: String, required: true },
  email:        { type: String, required: true, unique: true, lowercase: true },
  mobile:       { type: String },
  passwordHash: { type: String, required: true },
  role:         { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
  department:   { type: String },
  reportingManager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status:       { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active' },
  lastLogin:    { type: Date },
  profilePhoto: { type: String },
  preferences:  { type: Object, default: {} },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
