// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAT1gbRSnH6mZP4N6mr22ziwjcuZxgL4oY",
  authDomain: "frontend-assessmant.firebaseapp.com",
  projectId: "frontend-assessmant",
  storageBucket: "frontend-assessmant.appspot.com",
  messagingSenderId: "1095320781130",
  appId: "1:1095320781130:web:ed7e2eeed90ece6ce301b3"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;