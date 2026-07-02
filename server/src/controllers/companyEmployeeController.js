const { db } = require('../config/firebase');

exports.getEmployees = async (req, res) => {
  try {
    const snapshot = await db.collection('companyEmployees').get();
    const employees = [];
    snapshot.forEach(doc => employees.push({ id: doc.id, ...doc.data() }));
    res.json({ success: true, data: employees });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const doc = await db.collection('companyEmployees').doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ success: false, message: 'Employee not found' });
    res.json({ success: true, data: { id: doc.id, ...doc.data() } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const docRef = await db.collection('companyEmployees').add({
      ...req.body,
      createdAt: new Date().toISOString()
    });
    res.status(201).json({ success: true, data: { id: docRef.id, ...req.body } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateEmployeeStatus = async (req, res) => {
  try {
    await db.collection('companyEmployees').doc(req.params.id).update({
      status: req.body.status
    });
    res.json({ success: true, message: 'Status updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
