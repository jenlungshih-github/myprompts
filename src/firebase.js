import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    projectId: "chinese-prompts",
    appId: "1:98159143118:web:de46261ebb12ef004a889f",
    storageBucket: "chinese-prompts.firebasestorage.app",
    apiKey: "AIzaSyCz1vdUsjb7nZYrFCWKe-DFjswQJvEB4nI",
    authDomain: "chinese-prompts.firebaseapp.com",
    messagingSenderId: "98159143118",
    measurementId: "G-8YFNVNYBXT"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
