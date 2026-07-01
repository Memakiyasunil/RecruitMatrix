const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/users', userRoutes);

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
