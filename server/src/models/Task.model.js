const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskNumber:  { type: String, unique: true },
  clientId:    { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  title:       { type: String, required: true },
  description: { type: String },
  priority:    { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
  status:      { type: String, enum: ['Pending', 'In Progress', 'On Hold', 'Completed', 'Cancelled'], default: 'Pending' },
  
  // Entity Linkage
  moduleSource: { type: String, enum: ['Recruitment', 'Project', 'HR', 'General', 'Technical'], default: 'General' },
  relatedEntityId: { type: mongoose.Schema.Types.ObjectId },
  
  // Assignments
  assignedBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'CompanyEmployee' },
  assignedTo:  { type: mongoose.Schema.Types.ObjectId, ref: 'CompanyEmployee' },
  
  // Timelines
  assignedDate: { type: Date, default: Date.now },
  dueDate: { type: Date },
  completionDate: { type: Date },
  
  // Workflow
  reviewRequired: { type: Boolean, default: false },
  approvalStatus: { type: String, enum: ['Pending Review', 'Approved', 'Rework Required'] },
  
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
