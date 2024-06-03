// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "insta-next-425210.firebaseapp.com",
  projectId: "insta-next-425210",
  storageBucket: "insta-next-425210.appspot.com",
  messagingSenderId: "238380709281",
  appId: "1:238380709281:web:88fd83a94ae5fad95d47e0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);