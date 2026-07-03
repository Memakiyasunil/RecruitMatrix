const { db } = require('../config/firebase');

// ─── Attendance Controller ────────────────────────────────────────────────────
exports.getAttendance = async (req, res) => {
  try {
    if (!db) return res.status(503).json({ success: false, message: 'Service unavailable' });
    const { date, employeeId } = req.query;
    let query = db.collection('companyAttendance');
    const snapshot = await query.get();
    let records = [];
    snapshot.forEach(doc => records.push({ id: doc.id, ...doc.data() }));
    if (date) records = records.filter(r => r.date === date);
    if (employeeId) records = records.filter(r => r.employeeId === employeeId);
    res.json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.punchAttendance = async (req, res) => {
  try {
    if (!db) return res.status(503).json({ success: false, message: 'Service unavailable' });
    const { employeeId, employeeName, type, notes } = req.body; // type: 'in' | 'out'
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().split(' ')[0];

    // Check if record exists for today
    const snapshot = await db.collection('companyAttendance')
      .where('employeeId', '==', employeeId).where('date', '==', date).get();

    if (snapshot.empty) {
      if (type !== 'in') return res.status(400).json({ success: false, message: 'Must punch in first' });
      const data = { employeeId, employeeName, date, punchIn: time, punchOut: null, status: 'present', notes: notes || '', createdAt: now.toISOString() };
      const docRef = await db.collection('companyAttendance').add(data);
      return res.status(201).json({ success: true, data: { id: docRef.id, ...data } });
    }

    const doc = snapshot.docs[0];
    if (type === 'out') {
      await doc.ref.update({ punchOut: time, updatedAt: now.toISOString() });
      return res.json({ success: true, message: 'Punched out successfully' });
    }
    return res.status(400).json({ success: false, message: 'Already punched in today' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
