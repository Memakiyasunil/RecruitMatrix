const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/applicationController');

// Public routes (no auth required)
router.get('/public/jobs', ctrl.getPublicJobs);
router.get('/public/jobs/:jobId', ctrl.getPublicJobById);
router.post('/public/apply', ctrl.submitApplication);

// Job Openings management (admin)
router.get('/jobs', ctrl.getAllJobs);
router.post('/jobs', ctrl.createJob);
router.patch('/jobs/:id', ctrl.updateJob);
router.delete('/jobs/:id', ctrl.deleteJob);

// Application management
router.get('/applications', ctrl.getApplications);
router.get('/applications/:id', ctrl.getApplicationById);
router.patch('/applications/:id', ctrl.updateApplication);
router.patch('/applications/:id/status', ctrl.updateApplicationStatus);
router.delete('/applications/:id', ctrl.deleteApplication);
router.get('/applications/:id/timeline', ctrl.getApplicationTimeline);

module.exports = router;
