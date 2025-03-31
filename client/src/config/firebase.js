// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIRESTORE_API,
    authDomain: "market-project-c8ab8.firebaseapp.com",
    projectId: "market-project-c8ab8",
    storageBucket: "market-project-c8ab8.firebasestorage.app",
    messagingSenderId: "289787039071",
    appId: "1:289787039071:web:8c1725c39c09fc10657aea",
    measurementId: "G-5PED7C856C"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);