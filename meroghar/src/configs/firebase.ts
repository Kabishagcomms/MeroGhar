// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKKYbsi57vT8KFCtCbHcjwGWdy2h6z7p4",
  authDomain: "fypmeroghar-b2109.firebaseapp.com",
  projectId: "fypmeroghar-b2109",
  storageBucket: "fypmeroghar-b2109.appspot.com",
  messagingSenderId: "670938726313",
  appId: "1:670938726313:web:3d8e1af2ed12a895640eb8",
  measurementId: "G-VSED50X8Q6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth=getAuth(app);