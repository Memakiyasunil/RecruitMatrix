const { db } = require('../config/firebase');

exports.getAll = async (req, res) => {
  try {
    if (!db) return res.status(503).json({ success: false, message: 'Service unavailable' });
    const snapshot = await db.collection('clients').get();
    const clients = [];
    snapshot.forEach(doc => {
      clients.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json({ success: true, data: clients });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    if (!db) return res.status(503).json({ success: false, message: 'Service unavailable' });
    const clientData = {
      ...req.body,
      createdAt: new Date().toISOString()
    };
    const docRef = await db.collection('clients').add(clientData);
    res.status(201).json({ success: true, message: 'Created successfully', data: { id: docRef.id, ...clientData } });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    if (!db) return res.status(503).json({ success: false, message: 'Service unavailable' });
    const { id } = req.params;
    
    // Prevent updating the ID itself if it was sent in body
    const updateData = { ...req.body, updatedAt: new Date().toISOString() };
    delete updateData.id;

    await db.collection('clients').doc(id).update(updateData);
    
    res.status(200).json({ success: true, message: 'Updated successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    if (!db) return res.status(503).json({ success: false, message: 'Service unavailable' });
    const { id } = req.params;
    await db.collection('clients').doc(id).delete();
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
