// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARZKT6B5tnUIsaajRXoOAWVFf3uoy2JkU",
  authDomain: "dogalonehyu.firebaseapp.com",
  projectId: "dogalonehyu",
  storageBucket: "dogalonehyu.firebasestorage.app",
  messagingSenderId: "437880776451",
  appId: "1:437880776451:web:a28c60327d309fc1132b36",
  measurementId: "G-724JC4PSZN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);