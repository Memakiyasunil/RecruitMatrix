const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/attendanceController');
router.get('/', ctrl.getAttendance);
router.post('/punch', ctrl.punchAttendance);
module.exports = router;
