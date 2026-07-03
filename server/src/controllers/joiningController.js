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

// POST /api/v1/joinings — Create joining record
exports.createJoining = async (req, res) => {
  try {
    if (!db) return res.status(503).json({ success: false, message: 'Service unavailable' });

    const data = {
      applicationId: req.body.applicationId || '',
      candidateName: req.body.candidateName || '',
      requisitionId: req.body.requisitionId || '',
      clientId: req.body.clientId || '',
      positionApplied: req.body.positionApplied || '',
      offeredSalaryCTC: Number(req.body.offeredSalaryCTC) || 0,
      offerReleaseDate: req.body.offerReleaseDate || '',
      offerStatus: req.body.offerStatus || 'pending',
      offerAcceptedDate: req.body.offerAcceptedDate || '',
      expectedJoiningDate: req.body.expectedJoiningDate || '',
      actualJoiningDate: req.body.actualJoiningDate || '',
      joiningStatus: req.body.joiningStatus || 'offer-pending',
      documentChecklist: req.body.documentChecklist || [
        { name: 'Resume / CV', status: 'pending' },
        { name: 'Photo ID Proof', status: 'pending' },
        { name: 'Address Proof', status: 'pending' },
        { name: 'Educational Certificates', status: 'pending' },
        { name: 'Experience Letters', status: 'pending' },
        { name: 'Signed Offer Letter', status: 'pending' },
      ],
      preJoiningNotes: req.body.preJoiningNotes || '',
      hrRemarks: req.body.hrRemarks || '',
      recruiterRemarks: req.body.recruiterRemarks || '',
      managedBy: req.body.managedBy || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const docRef = await db.collection('candidateJoinings').add(data);

    // Update application status
    if (data.applicationId) {
      await db.collection('candidateApplications').doc(data.applicationId).update({
        status: 'Offered',
        currentStage: 'Offered',
        updatedAt: new Date().toISOString()
      });
      await addTimelineEvent(data.applicationId, 'offered',
        'Offer Initiated',
        `Offer initiated. CTC: ${data.offeredSalaryCTC}. Expected joining: ${data.expectedJoiningDate}`,
        data.managedBy
      );
    }

    res.status(201).json({ success: true, data: { id: docRef.id, ...data } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/v1/joinings
exports.getJoinings = async (req, res) => {
  try {
    if (!db) return res.status(503).json({ success: false, message: 'Service unavailable' });
    const snapshot = await db.collection('candidateJoinings').get();
    let joinings = [];
    snapshot.forEach(doc => joinings.push({ id: doc.id, ...doc.data() }));

    const { joiningStatus, clientId } = req.query;
    if (joiningStatus) joinings = joinings.filter(j => j.joiningStatus === joiningStatus);
    if (clientId) joinings = joinings.filter(j => j.clientId === clientId);

    joinings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ success: true, data: joinings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/v1/joinings/:id
exports.getJoiningById = async (req, res) => {
  try {
    if (!db) return res.status(503).json({ success: false, message: 'Service unavailable' });
    const doc = await db.collection('candidateJoinings').doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ success: false, message: 'Joining record not found' });
    res.json({ success: true, data: { id: doc.id, ...doc.data() } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PATCH /api/v1/joinings/:id — Update joining record
exports.updateJoining = async (req, res) => {
  try {
    if (!db) return res.status(503).json({ success: false, message: 'Service unavailable' });
    const doc = await db.collection('candidateJoinings').doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ success: false, message: 'Joining record not found' });

    const prev = doc.data();
    const updateData = { ...req.body, updatedAt: new Date().toISOString() };
    await db.collection('candidateJoinings').doc(req.params.id).update(updateData);

    // Handle status transitions
    const newStatus = req.body.joiningStatus;
    if (newStatus && newStatus !== prev.joiningStatus && prev.applicationId) {
      let appStatus = 'Joining In Progress';
      if (newStatus === 'joined') appStatus = 'Joined';
      if (newStatus === 'offer-accepted') appStatus = 'Offer Accepted';
      if (newStatus === 'offer-rejected') appStatus = 'Offer Rejected';
      if (newStatus === 'no-show') appStatus = 'No Show';

      await db.collection('candidateApplications').doc(prev.applicationId).update({
        status: appStatus, currentStage: appStatus, updatedAt: new Date().toISOString()
      });

      await addTimelineEvent(prev.applicationId, newStatus,
        `Joining Status: ${newStatus.replace(/-/g, ' ').toUpperCase()}`,
        req.body.hrRemarks || `Status updated to ${newStatus}`,
        req.body.updatedBy || 'system'
      );
    }

    res.json({ success: true, message: 'Joining record updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
