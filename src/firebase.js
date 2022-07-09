import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDzBPJrEJHEoq84O4yApc_qnds0xJCn3bA",
	authDomain: "admin-app-turismo-93be1.firebaseapp.com",
	projectId: "admin-app-turismo-93be1",
	storageBucket: "admin-app-turismo-93be1.appspot.com",
	messagingSenderId: "261558448454",
	appId: "1:261558448454:web:323491c4c6eaf1e7983547",
};

// Initialize Firebase and Firestore
export const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export const storage = getStorage(app);
export {db}