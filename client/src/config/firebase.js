import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBrc6X0-3Fa_bKnHhl7f1sEoe7FNd8mi-k",
  authDomain: "recruitmatrix-d8284.firebaseapp.com",
  projectId: "recruitmatrix-d8284",
  storageBucket: "recruitmatrix-d8284.firebasestorage.app",
  messagingSenderId: "463226509250",
  appId: "1:463226509250:web:17a213bb70abce2c8be85b",
  measurementId: "G-9KEKVE3T64"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider, analytics };
