import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyAV4qeWKmTLWj1TupungpDS_3lL8zLHKeg",
	authDomain: "danp-proyecto-final-01.firebaseapp.com",
	databaseURL: "https://danp-proyecto-final-01-default-rtdb.firebaseio.com",
	projectId: "danp-proyecto-final-01",
	storageBucket: "danp-proyecto-final-01.appspot.com",
	messagingSenderId: "375227824360",
	appId: "1:375227824360:web:60c9bffba4ee56ddceb15d",
	measurementId: "G-QZTFD478TT",
};

// Initialize Firebase and Firestore
export const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export const storage = getStorage(app);
export {db}