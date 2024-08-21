// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgg8PU8RnRRcTzhAiVIUdBnxySLYWzhAQ",
  authDomain: "netflix-gpt-7e9f9.firebaseapp.com",
  projectId: "netflix-gpt-7e9f9",
  storageBucket: "netflix-gpt-7e9f9.appspot.com",
  messagingSenderId: "423511906593",
  appId: "1:423511906593:web:6376e6b8087560c79cc660",
  measurementId: "G-27EZSR5XPV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();