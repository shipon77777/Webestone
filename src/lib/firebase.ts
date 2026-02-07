import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDm_QjRdUc4JqCClZddkYCMYV1a-waw-N4",
    authDomain: "webestone.firebaseapp.com",
    projectId: "webestone",
    storageBucket: "webestone.firebasestorage.app",
    messagingSenderId: "1043179120897",
    appId: "1:1043179120897:web:5ad63d0505bba242695300",
    measurementId: "G-72YLE20X0K"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

let analytics;

if (typeof window !== "undefined") {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

export { app, db, auth, analytics };
