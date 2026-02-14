import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBoCVWC6M3vlVEiGB1XioRhHUQE4W7YrzA",
    authDomain: "peaschool-387a2.firebaseapp.com",
    projectId: "peaschool-387a2",
    storageBucket: "peaschool-387a2.firebasestorage.app",
    messagingSenderId: "687612688379",
    appId: "1:687612688379:web:f0e28d12498b002eae3d5e",
    measurementId: "G-8F9QPQLM7H"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Initialize Analytics conditionally (it doesn't work in all environments)
const analytics = typeof window !== "undefined" ? isSupported().then(yes => yes ? getAnalytics(app) : null) : null;

export { app, db, auth, analytics };
