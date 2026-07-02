const { db } = require('../config/firebase');

exports.getAll = async (req, res) => {
  try {
    const snapshot = await db.collection('interviews').get();
    const data = [];
    snapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const docRef = await db.collection('interviews').add({
      ...req.body,
      createdAt: new Date().toISOString(),
      isActive: true
    });
    res.status(201).json({ success: true, message: 'Created successfully', id: docRef.id });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
