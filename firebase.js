// ========= Part 3: firebase.js =========
// Haɗa Firebase v9 Modular SDK

import { initializeApp } from "https://www.gstaticunk.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Saka config dinka a nan
const firebaseConfig = {
  apiKey: "AIzaSyDS6exL8vTwOvEC920dsGCAzbem560kFG0",
  authDomain: "aspcc-8095b.firebaseapp.com",
  projectId: "aspcc-8095b",
  storageBucket: "aspcc-8095b.firebasestorage.app",
  messagingSenderId: "170869284554",
  appId: "1:170869284554:web:dbdfac2f3534b40bd91e33",
  measurementId: "G-PXW4SNCLH8"
};

// Init Firebase
const app = initializeApp(firebaseConfig);

// Export abubuwan da za mu yi amfani da su a script.js
export const auth = getAuth(app);
export const db = getFirestore(app);

// Export functions din Firestore da Auth don sauƙin amfani
export {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy
};