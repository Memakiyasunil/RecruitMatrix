import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, provider } from '../config/firebase';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // If user exists, we map the firebase user to our schema
      if (user) {
        setCurrentUser({
          uid: user.uid,
          name: user.displayName || 'Google User',
          email: user.email,
          photoURL: user.photoURL,
          role: 'Admin', // Default to Admin for now as requested by earlier mock
        });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const loginWithGoogle = async () => {
    if (!auth) return Promise.reject("Auth not initialized");
    try {
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (error) {
      console.error("Google login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    if (!auth) return Promise.resolve();
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const value = {
    currentUser,
    loginWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
