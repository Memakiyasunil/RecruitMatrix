const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  clientCode:    { type: String, unique: true },
  clientName:    { type: String, required: true },
  domain:        { type: String },
  industry:      { type: String },
  website:       { type: String },
  contactPerson: { type: String },
  contactEmail:  { type: String },
  contactMobile: { type: String },
  city:          { type: String },
  state:         { type: String },
  country:       { type: String },
  address:       { type: String },
  logo:          { type: String },
  status:        { type: String, enum: ['active', 'inactive'], default: 'active' },
  documents:     [{ name: String, url: String, uploadedAt: Date }],
  notes:         { type: String },
  createdBy:     { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);
