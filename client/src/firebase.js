// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// paste your Firebase config below
const firebaseConfig = {
  apiKey: "AIzaSyARc--F9J2_vJZBeEuoKoB5vAYkdjxBwQo",
  authDomain: "cloudcommunity-83624.firebaseapp.com",
  projectId: "cloudcommunity-83624",
  storageBucket: "cloudcommunity-83624.firebasestorage.app",
  messagingSenderId: "601434608412",
  appId: "1:601434608412:web:78e6fc617a405a9969e0d9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
