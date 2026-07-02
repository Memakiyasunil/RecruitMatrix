const mongoose = require('mongoose');

const taskCommentSchema = new mongoose.Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'CompanyEmployee', required: true },
  commentText: { type: String, required: true },
  attachments: [{
    fileUrl: String,
    fileName: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('TaskComment', taskCommentSchema);
