const { db } = require('../config/firebase');

// Add activity to candidate timeline
const addTimelineEvent = async (applicationId, eventType, eventTitle, eventDescription, performedBy = 'system') => {
  try {
    if (!db) return;
    await db.collection('candidateActivityTimeline').add({
      applicationId,
      eventType,
      eventTitle,
      eventDescription,
      performedBy,
      createdAt: new Date().toISOString()
    });
  } catch (err) {
    console.error('Timeline write failed:', err.message);
  }
};

// GET /api/v1/public/jobs — List all active job openings
exports.getPublicJobs = async (req, res) => {
  try {
    if (!db) return res.status(503).json({ success: false, message: 'Service unavailable' });

    let query = db.collection('jobOpenings').where('isActive', '==', true);
    const snapshot = await query.get();

    let jobs = [];
    snapshot.forEach(doc => jobs.push({ id: doc.id, ...doc.data() }));

    // Apply filters
    const { keyword, location, department, employmentType, workMode } = req.query;
    if (keyword) {
      const kw = keyword.toLowerCase();
      jobs = jobs.filter(j => j.title?.toLowerCase().includes(kw) || j.skills?.some(s => s.toLowerCase().includes(kw)));
    }
    if (location) jobs = jobs.filter(j => j.location?.toLowerCase().includes(location.toLowerCase()));
    if (department) jobs = jobs.filter(j => j.department?.toLowerCase() === department.toLowerCase());
    if (employmentType) jobs = jobs.filter(j => j.employmentType === employmentType);
    if (workMode) jobs = jobs.filter(j => j.workMode === workMode);

    // Hide sensitive data for public display
    jobs = jobs.map(j => ({
      ...j,
      clientId: j.companyNameVisible ? j.clientId : undefined,
      salaryMin: j.salaryVisible ? j.salaryMin : undefined,
      salaryMax: j.salaryVisible ? j.salaryMax : undefined,
    }));

    res.json({ success: true, data: jobs, total: jobs.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/v1/public/jobs/:jobId
exports.getPublicJobById = async (req, res) => {
  try {
    if (!db) return res.status(503).json({ success: false, message: 'Service unavailable' });
    const doc = await db.collection('jobOpenings').doc(req.params.jobId).get();
    if (!doc.exists || !doc.data().isActive) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    res.json({ success: true, data: { id: doc.id, ...doc.data() } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/v1/jobs — List all jobs (admin)
exports.getAllJobs = async (req, res) => {
  try {
    if (!db) return res.status(503).json({ success: false, message: 'Service unavailable' });
    const snapshot = await db.collection('jobOpenings').get();
    const jobs = [];
    snapshot.forEach(doc => jobs.push({ id: doc.id, ...doc.data() }));
    res.json({ success: true, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/v1/jobs — Create job opening
exports.createJob = async (req, res) => {
  try {
    if (!db) return res.status(503).json({ success: false, message: 'Service unavailable' });
    const data = {
      ...req.body,
      isActive: true,
      postedDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const docRef = await db.collection('jobOpenings').add(data);
    res.status(201).json({ success: true, data: { id: docRef.id, ...data } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PATCH /api/v1/jobs/:id — Update job
exports.updateJob = async (req, res) => {
  try {
    if (!db) return res.status(503).json({ success: false, message: 'Service unavailable' });
    await db.collection('jobOpenings').doc(req.params.id).update({
      ...req.body,
      updatedAt: new Date().toISOString()
    });
    res.json({ success: true, message: 'Job updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/v1/jobs/:id — Delete job
exports.deleteJob = async (req, res) => {
  try {
    if (!db) return res.status(503).json({ success: false, message: 'Service unavailable' });
    await db.collection('jobOpenings').doc(req.params.id).delete();
    res.json({ success: true, message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/v1/public/apply — Candidate submits application
exports.submitApplication = async (req, res) => {
  try {
    if (!db) return res.status(503).json({ success: false, message: 'Service unavailable' });

    const {
      firstName, lastName, email, mobile, currentLocation, preferredLocation,
      dateOfBirth, gender, currentCompany, currentDesignation, totalExperience,
      relevantExperience, currentCTC, expectedCTC, noticePeriod, skills,
      highestQualification, certifications, linkedinUrl, portfolioUrl,
      positionApplied, requisitionId, jobId, clientId,
      whyHireYou, availableToRelocate, availableToTravel,
      resumeUrl, coverLetterUrl, additionalDocUrl, termsConsent, declarationConsent
    } = req.body;

    if (!firstName || !lastName || !email || !mobile || !resumeUrl || !jobId) {
      return res.status(400).json({ success: false, message: 'Missing required fields: firstName, lastName, email, mobile, resumeUrl, jobId' });
    }

    const applicationData = {
      firstName, lastName, email: email.toLowerCase().trim(), mobile,
      currentLocation: currentLocation || '', preferredLocation: preferredLocation || '',
      dateOfBirth: dateOfBirth || null, gender: gender || '',
      currentCompany: currentCompany || '', currentDesignation: currentDesignation || '',
      totalExperience: Number(totalExperience) || 0,
      relevantExperience: Number(relevantExperience) || 0,
      currentCTC: Number(currentCTC) || 0,
      expectedCTC: Number(expectedCTC) || 0,
      noticePeriod: Number(noticePeriod) || 0,
      skills: Array.isArray(skills) ? skills : (skills ? skills.split(',').map(s => s.trim()) : []),
      highestQualification: highestQualification || '',
      certifications: certifications || '',
      linkedinUrl: linkedinUrl || '', portfolioUrl: portfolioUrl || '',
      positionApplied: positionApplied || '', requisitionId: requisitionId || '',
      jobId: jobId || '', clientId: clientId || '',
      whyHireYou: whyHireYou || '',
      availableToRelocate: availableToRelocate === true || availableToRelocate === 'true',
      availableToTravel: availableToTravel === true || availableToTravel === 'true',
      resumeUrl: resumeUrl || '', coverLetterUrl: coverLetterUrl || '',
      additionalDocUrl: additionalDocUrl || '',
      source: 'website',
      status: 'Applied',
      currentStage: 'New Application',
      termsConsent: termsConsent === true, declarationConsent: declarationConsent === true,
      appliedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const docRef = await db.collection('candidateApplications').add(applicationData);
    
    // Log timeline event
    await addTimelineEvent(docRef.id, 'applied', 'Application Submitted', `${firstName} ${lastName} applied for ${positionApplied || 'a position'} via website`, 'system');

    res.status(201).json({ success: true, message: 'Application submitted successfully', data: { id: docRef.id, ...applicationData } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/v1/applications — List all applications
exports.getApplications = async (req, res) => {
  try {
    if (!db) return res.status(503).json({ success: false, message: 'Service unavailable' });
    const snapshot = await db.collection('candidateApplications').get();
    const applications = [];
    snapshot.forEach(doc => applications.push({ id: doc.id, ...doc.data() }));

    let filtered = applications;
    const { status, clientId, requisitionId, jobId } = req.query;
    if (status) filtered = filtered.filter(a => a.status === status);
    if (clientId) filtered = filtered.filter(a => a.clientId === clientId);
    if (requisitionId) filtered = filtered.filter(a => a.requisitionId === requisitionId);
    if (jobId) filtered = filtered.filter(a => a.jobId === jobId);

    res.json({ success: true, data: filtered, total: filtered.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/v1/applications/:id — Get application detail
exports.getApplicationById = async (req, res) => {
  try {
    if (!db) return res.status(503).json({ success: false, message: 'Service unavailable' });
    const doc = await db.collection('candidateApplications').doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ success: false, message: 'Application not found' });
    res.json({ success: true, data: { id: doc.id, ...doc.data() } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PATCH /api/v1/applications/:id/status — Update candidate status
exports.updateApplicationStatus = async (req, res) => {
  try {
    if (!db) return res.status(503).json({ success: false, message: 'Service unavailable' });
    const { status, stage, remarks } = req.body;
    const docRef = db.collection('candidateApplications').doc(req.params.id);
    const doc = await docRef.get();
    if (!doc.exists) return res.status(404).json({ success: false, message: 'Application not found' });

    await docRef.update({ status, currentStage: stage || status, updatedAt: new Date().toISOString() });

    await addTimelineEvent(req.params.id, status.toLowerCase().replace(/ /g, '-'),
      `Status Updated: ${status}`, remarks || `Candidate moved to ${status}`,
      req.body.updatedBy || 'system'
    );

    res.json({ success: true, message: `Status updated to ${status}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PATCH /api/v1/applications/:id — Update application data
exports.updateApplication = async (req, res) => {
  try {
    if (!db) return res.status(503).json({ success: false, message: 'Service unavailable' });
    await db.collection('candidateApplications').doc(req.params.id).update({
      ...req.body,
      updatedAt: new Date().toISOString()
    });
    res.json({ success: true, message: 'Application updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/v1/applications/:id
exports.deleteApplication = async (req, res) => {
  try {
    if (!db) return res.status(503).json({ success: false, message: 'Service unavailable' });
    await db.collection('candidateApplications').doc(req.params.id).delete();
    res.json({ success: true, message: 'Application deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/v1/applications/:id/timeline
exports.getApplicationTimeline = async (req, res) => {
  try {
    if (!db) return res.status(503).json({ success: false, message: 'Service unavailable' });
    const snapshot = await db.collection('candidateActivityTimeline')
      .where('applicationId', '==', req.params.id).get();
    const timeline = [];
    snapshot.forEach(doc => timeline.push({ id: doc.id, ...doc.data() }));
    timeline.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    res.json({ success: true, data: timeline });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
