const admin = require('firebase-admin');

// Note: Ensure FIREBASE_SERVICE_ACCOUNT is a JSON string in .env
// Example: FIREBASE_SERVICE_ACCOUNT='{"type":"service_account","project_id":"..."}'
let db = null;
let auth = null;

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    
    db = admin.firestore();
    auth = admin.auth();
    console.log('Firebase Admin initialized successfully');
  } else {
    console.warn('WARNING: FIREBASE_SERVICE_ACCOUNT not found in environment variables. Firebase is not initialized.');
  }
} catch (error) {
  console.error('Firebase Admin initialization error:', error);
}

module.exports = { admin, db, auth };
