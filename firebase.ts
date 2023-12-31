import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_-sQmiVnubfSSaiETyfzI2iDZWb1ziFM",
  authDomain: "sciai-web.firebaseapp.com",
  projectId: "sciai-web",
  storageBucket: "sciai-web.appspot.com",
  messagingSenderId: "661777440647",
  appId: "1:661777440647:web:cb190badaf82e4f7b87d22",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
