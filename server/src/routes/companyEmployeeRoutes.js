const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/companyEmployeeController');

router.get('/', employeeController.getEmployees);
router.post('/', employeeController.createEmployee);
router.get('/:id', employeeController.getEmployeeById);
router.put('/:id/status', employeeController.updateEmployeeStatus);

module.exports = router;
