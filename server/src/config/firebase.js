const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin/auth');

let db = null;
let auth = null;
let admin = null; // Just for fallback compat

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    const app = initializeApp({
      credential: cert(serviceAccount)
    });
    
    db = getFirestore(app);
    auth = getAuth(app);
    admin = { firestore: require('firebase-admin/firestore') }; // Provide mock admin.firestore.FieldValue.serverTimestamp()
    console.log('Firebase Admin initialized successfully');
  } else {
    console.warn('WARNING: FIREBASE_SERVICE_ACCOUNT not found in environment variables. Firebase is not initialized.');
  }
} catch (error) {
  console.error('Firebase Admin initialization error:', error);
}

module.exports = { admin, db, auth };
