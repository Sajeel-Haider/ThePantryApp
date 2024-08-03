// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJZlrtT27IwIb9llTA4dUWyOclAKgRkZ0",
  authDomain: "thepantryapp-9269c.firebaseapp.com",
  projectId: "thepantryapp-9269c",
  storageBucket: "thepantryapp-9269c.appspot.com",
  messagingSenderId: "775095474111",
  appId: "1:775095474111:web:a220e3ecfa4497ac5c330a",
  measurementId: "G-PCKQQH7KQ0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
