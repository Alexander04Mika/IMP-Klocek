import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database"; 
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyBDJoQzCDz6Ite_ZZ_ZMTgYRhfpCzfi-mA",
  authDomain: "imp-topgastro.firebaseapp.com",
  projectId: "imp-topgastro",
  storageBucket: "imp-topgastro.firebasestorage.app",
  messagingSenderId: "1050890257870",
  appId: "1:1050890257870:web:834e74a05df666ac99979f",
  measurementId: "G-ZYWDLGTR03"
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const dbRef = ref; 
export const dbSet = set; 
