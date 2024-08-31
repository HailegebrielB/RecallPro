// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirebase, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "ai-flashcards-acfe2.firebaseapp.com",
  projectId: "ai-flashcards-acfe2",
  storageBucket: "ai-flashcards-acfe2.appspot.com",
  messagingSenderId: "595620157563",
  appId: "1:595620157563:web:e4bfb2afa45a37afb6eade",
  measurementId: "G-G3YWCV7CGB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
