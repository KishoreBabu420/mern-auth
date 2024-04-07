// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: 'mern-auth-389a9.firebaseapp.com',
  projectId: 'mern-auth-389a9',
  storageBucket: 'mern-auth-389a9.appspot.com',
  messagingSenderId: '873423278163',
  appId: '1:873423278163:web:9dc179840145674ee3b6a6',
};

// Initialize Firebase
const App = initializeApp(firebaseConfig);

const appAuth = getAuth(App);
const provider = new GoogleAuthProvider();

export const signInWithGooglePopup = async () => {
  return await signInWithPopup(appAuth, provider);
};
