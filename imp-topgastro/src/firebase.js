import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database"; // For Realtime Database
import { getFirestore } from "firebase/firestore"; // For Firestore
import { getAuth } from "firebase/auth"; // For Authentication

const firebaseConfig = {
  apiKey: "AIzaSyBDJoQzCDz6Ite_ZZ_ZMTgYRhfpCzfi-mA",
  authDomain: "imp-topgastro.firebaseapp.com",
  projectId: "imp-topgastro",
  storageBucket: "imp-topgastro.firebasestorage.app",
  messagingSenderId: "1050890257870",
  appId: "1:1050890257870:web:834e74a05df666ac99979f",
  measurementId: "G-ZYWDLGTR03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const database = getDatabase(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const dbRef = ref; // Export `ref` for Realtime Database
export const dbSet = set; // Export `set` for Realtime Database
