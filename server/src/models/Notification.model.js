const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title:      { type: String, required: true },
  message:    { type: String, required: true },
  type:       { type: String, enum: ['info', 'success', 'warning', 'error', 'task', 'approval', 'interview', 'offer'], default: 'info' },
  link:       { type: String }, // frontend route to navigate to
  isRead:     { type: Boolean, default: false },
  readAt:     { type: Date },
  sourceModel:{ type: String }, // e.g. 'TalentRequisition', 'Interview'
  sourceId:   { type: mongoose.Schema.Types.ObjectId },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
