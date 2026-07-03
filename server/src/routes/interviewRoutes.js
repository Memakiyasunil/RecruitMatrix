const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/interviewController');

// Interview scheduling
router.post('/', ctrl.scheduleInterview);
router.get('/', ctrl.getInterviews);
router.get('/feedback-all', ctrl.getAllFeedback);
router.get('/:id', ctrl.getInterviewById);
router.patch('/:id', ctrl.updateInterview);
router.delete('/:id', ctrl.cancelInterview);

// Feedback
router.post('/:id/feedback', ctrl.submitFeedback);
router.get('/:id/feedback', ctrl.getFeedbackByInterview);

module.exports = router;
