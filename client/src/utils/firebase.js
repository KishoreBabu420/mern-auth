// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

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
const storage = getStorage(App);

//Auth Providers
const provider = new GoogleAuthProvider();

export const signInWithGooglePopup = async () => {
  return await signInWithPopup(appAuth, provider);
};

export const uploadFile = async (file, path) => {
  // Check if file is valid
  if (!file || !file.type) {
    throw new Error('Invalid file provided');
  }

  // Get a reference to Firebase Storage
  const storageRef = ref(storage, path);

  // Upload the file
  const uploadTask = uploadBytesResumable(storageRef, file);

  // Wait for upload to finish
  await uploadTask;

  // Get download URL after successful upload
  const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  return downloadURL;
};
