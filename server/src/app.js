const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const clientRoutes = require('./routes/clientRoutes');
const masterRoutes = require('./routes/masterRoutes');
const requisitionRoutes = require('./routes/requisitionRoutes');
const allocationRoutes = require('./routes/allocationRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const screeningRoutes = require('./routes/screeningRoutes');
const shortlistingRoutes = require('./routes/shortlistingRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const offerRoutes = require('./routes/offerRoutes');
const joiningRoutes = require('./routes/joiningRoutes');
const taskRoutes = require('./routes/taskRoutes');
const reportRoutes = require('./routes/reportRoutes');
const auditRoutes = require('./routes/auditRoutes');
const settingRoutes = require('./routes/settingRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const authRoutes = require('./routes/authRoutes');
const companyEmployeeRoutes = require('./routes/companyEmployeeRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/company/employees', companyEmployeeRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/clients', clientRoutes);
app.use('/api/v1/masters', masterRoutes);
app.use('/api/v1/requisitions', requisitionRoutes);
app.use('/api/v1/allocations', allocationRoutes);
app.use('/api/v1/candidates', candidateRoutes);
app.use('/api/v1/screenings', screeningRoutes);
app.use('/api/v1/shortlistings', shortlistingRoutes);
app.use('/api/v1/interviews', interviewRoutes);
app.use('/api/v1/offers', offerRoutes);
app.use('/api/v1/joinings', joiningRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/reports', reportRoutes);
app.use('/api/v1/audits', auditRoutes);
app.use('/api/v1/settings', settingRoutes);

// New hiring workflow routes
app.use('/api/v1', applicationRoutes);

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'TalentFlow ERP CRM API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

module.exports = app;
