const { db, auth } = require('../config/firebase');

exports.getAllUsers = async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ success: false, message: 'Database not initialized' });
    }
    const usersSnapshot = await db.collection('users').get();
    const users = [];
    usersSnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { email, password, role, name } = req.body;
    if (!auth || !db) {
        return res.status(500).json({ success: false, message: 'Firebase services not initialized' });
    }

    // Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
    });

    // Store user data in Firestore
    const userData = {
      uid: userRecord.uid,
      email,
      name,
      role: role || 'STAFF',
      createdAt: new Date().toISOString(),
      isActive: true
    };

    await db.collection('users').doc(userRecord.uid).set(userData);

    res.status(201).json({ success: true, message: 'User created successfully', data: userData });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
