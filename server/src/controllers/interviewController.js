const { db } = require('../config/firebase');

const addTimelineEvent = async (applicationId, eventType, eventTitle, eventDescription, performedBy = 'system') => {
  try {
    if (!db) return;
    await db.collection('candidateActivityTimeline').add({
      applicationId, eventType, eventTitle, eventDescription, performedBy,
      createdAt: new Date().toISOString()
    });
  } catch (err) { console.error('Timeline write failed:', err.message); }
};

// POST /api/v1/interviews — Schedule interview
exports.scheduleInterview = async (req, res) => {
  try {
    if (!db) return res.status(503).json({ success: false, message: 'Service unavailable' });

    const data = {
      applicationId: req.body.applicationId || '',
      candidateName: req.body.candidateName || '',
      requisitionId: req.body.requisitionId || '',
      clientId: req.body.clientId || '',
      roundNumber: Number(req.body.roundNumber) || 1,
      roundType: req.body.roundType || 'hr-screening',
      mode: req.body.mode || 'video',
      scheduledDate: req.body.scheduledDate || '',
      startTime: req.body.startTime || '',
      endTime: req.body.endTime || '',
      timezone: req.body.timezone || 'IST',
      location: req.body.location || '',
      meetingLink: req.body.meetingLink || '',
      interviewers: Array.isArray(req.body.interviewers) ? req.body.interviewers : [],
      notes: req.body.notes || '',
      requiredDocuments: req.body.requiredDocuments || '',
      status: 'scheduled',
      rescheduleReason: '',
      scheduledBy: req.body.scheduledBy || 'system',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const docRef = await db.collection('candidateInterviews').add(data);

    // Update application status
    if (data.applicationId) {
      await db.collection('candidateApplications').doc(data.applicationId).update({
        status: 'Interview Scheduled',
        currentStage: 'Interview Scheduled',
        updatedAt: new Date().toISOString()
      });
      await addTimelineEvent(data.applicationId, 'interview-scheduled',
        `Interview Scheduled — Round ${data.roundNumber}`,
        `${data.roundType} scheduled on ${data.scheduledDate} at ${data.startTime}`,
        data.scheduledBy
      );
    }

    res.status(201).json({ success: true, data: { id: docRef.id, ...data } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/v1/interviews — List all interviews
exports.getInterviews = async (req, res) => {
  try {
    if (!db) return res.status(503).json({ success: false, message: 'Service unavailable' });
    const snapshot = await db.collection('candidateInterviews').get();
    let interviews = [];
    snapshot.forEach(doc => interviews.push({ id: doc.id, ...doc.data() }));

    const { applicationId, status, clientId } = req.query;
    if (applicationId) interviews = interviews.filter(i => i.applicationId === applicationId);
    if (status) interviews = interviews.filter(i => i.status === status);
    if (clientId) interviews = interviews.filter(i => i.clientId === clientId);

    interviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ success: true, data: interviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/v1/interviews/:id
exports.getInterviewById = async (req, res) => {
  try {
    if (!db) return res.status(503).json({ success: false, message: 'Service unavailable' });
    const doc = await db.collection('candidateInterviews').doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ success: false, message: 'Interview not found' });
    res.json({ success: true, data: { id: doc.id, ...doc.data() } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PATCH /api/v1/interviews/:id — Update / reschedule
exports.updateInterview = async (req, res) => {
  try {
    if (!db) return res.status(503).json({ success: false, message: 'Service unavailable' });
    const doc = await db.collection('candidateInterviews').doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ success: false, message: 'Interview not found' });

    const updateData = { ...req.body, updatedAt: new Date().toISOString() };
    await db.collection('candidateInterviews').doc(req.params.id).update(updateData);

    if (req.body.scheduledDate && doc.data().applicationId) {
      await addTimelineEvent(doc.data().applicationId, 'interview-rescheduled',
        `Interview Rescheduled — Round ${doc.data().roundNumber}`,
        `Rescheduled to ${req.body.scheduledDate}. Reason: ${req.body.rescheduleReason || 'Not specified'}`,
        req.body.updatedBy || 'system'
      );
    }

    res.json({ success: true, message: 'Interview updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/v1/interviews/:id
exports.cancelInterview = async (req, res) => {
  try {
    if (!db) return res.status(503).json({ success: false, message: 'Service unavailable' });
    await db.collection('candidateInterviews').doc(req.params.id).update({
      status: 'cancelled', updatedAt: new Date().toISOString()
    });
    res.json({ success: true, message: 'Interview cancelled' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/v1/interviews/:id/feedback — Submit feedback
exports.submitFeedback = async (req, res) => {
  try {
    if (!db) return res.status(503).json({ success: false, message: 'Service unavailable' });

    const interview = await db.collection('candidateInterviews').doc(req.params.id).get();
    if (!interview.exists) return res.status(404).json({ success: false, message: 'Interview not found' });

    const iv = interview.data();
    const feedbackData = {
      interviewId: req.params.id,
      applicationId: iv.applicationId || '',
      candidateName: iv.candidateName || '',
      requisitionId: iv.requisitionId || '',
      roundNumber: iv.roundNumber,
      interviewerId: req.body.interviewerId || '',
      interviewerName: req.body.interviewerName || '',
      technicalRating: Number(req.body.technicalRating) || 0,
      communicationRating: Number(req.body.communicationRating) || 0,
      experienceRelevanceRating: Number(req.body.experienceRelevanceRating) || 0,
      behavioralRating: Number(req.body.behavioralRating) || 0,
      problemSolvingRating: Number(req.body.problemSolvingRating) || 0,
      overallRating: Number(req.body.overallRating) || 0,
      strengths: req.body.strengths || '',
      weaknesses: req.body.weaknesses || '',
      detailedComments: req.body.detailedComments || '',
      recommendation: req.body.recommendation || 'hold',
      proposedSalary: Number(req.body.proposedSalary) || 0,
      submittedBy: req.body.submittedBy || '',
      submittedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    const feedbackRef = await db.collection('interviewFeedback').add(feedbackData);

    // Mark interview as completed
    await db.collection('candidateInterviews').doc(req.params.id).update({
      status: 'completed', updatedAt: new Date().toISOString()
    });

    // Update application status
    if (iv.applicationId) {
      await db.collection('candidateApplications').doc(iv.applicationId).update({
        status: 'Interview Completed',
        currentStage: 'Interview Completed',
        updatedAt: new Date().toISOString()
      });
      await addTimelineEvent(iv.applicationId, 'feedback-submitted',
        `Interview Feedback Submitted — Round ${iv.roundNumber}`,
        `Recommendation: ${req.body.recommendation}. Overall Rating: ${req.body.overallRating}/10`,
        req.body.submittedBy || 'system'
      );
    }

    res.status(201).json({ success: true, data: { id: feedbackRef.id, ...feedbackData } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/v1/interviews/:id/feedback
exports.getFeedbackByInterview = async (req, res) => {
  try {
    if (!db) return res.status(503).json({ success: false, message: 'Service unavailable' });
    const snapshot = await db.collection('interviewFeedback')
      .where('interviewId', '==', req.params.id).get();
    const feedback = [];
    snapshot.forEach(doc => feedback.push({ id: doc.id, ...doc.data() }));
    res.json({ success: true, data: feedback });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/v1/feedback — All feedback
exports.getAllFeedback = async (req, res) => {
  try {
    if (!db) return res.status(503).json({ success: false, message: 'Service unavailable' });
    const snapshot = await db.collection('interviewFeedback').get();
    const feedback = [];
    snapshot.forEach(doc => feedback.push({ id: doc.id, ...doc.data() }));
    res.json({ success: true, data: feedback });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
