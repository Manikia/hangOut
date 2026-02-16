// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQFkOCliYaU4mq1kAG-JFyWlTtxPeyRqc",
  authDomain: "daho-hangout-planner.firebaseapp.com",
  projectId: "daho-hangout-planner",
  storageBucket: "daho-hangout-planner.firebasestorage.app",
  messagingSenderId: "1088708589042",
  appId: "1:1088708589042:web:59180d2e82703491b1676b",
  measurementId: "G-2XMXP53C28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
