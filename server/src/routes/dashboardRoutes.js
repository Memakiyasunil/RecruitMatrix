const express = require('express');
const router = express.Router();
const { getDashboardMetrics } = require('../controllers/dashboardController');

// GET /api/v1/dashboard
router.get('/', getDashboardMetrics);

module.exports = router;
