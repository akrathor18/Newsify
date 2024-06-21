// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBx9ZBtu0EKCGbE8P2pJZZOhBh-7m_6nQM",
  authDomain: "newsify-dev.firebaseapp.com",
  projectId: "newsify-dev",
  storageBucket: "newsify-dev.appspot.com",
  messagingSenderId: "528643430394",
  appId: "1:528643430394:web:e1a6fe460efd14f56d7643",
  measurementId: "G-FQZV5NR8F9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);