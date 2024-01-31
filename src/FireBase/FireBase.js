// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4S6FZSr-5Y5-TfGhqmNNQd5PITVIlZ2w",
  authDomain: "table-dynamic.firebaseapp.com",
  projectId: "table-dynamic",
  storageBucket: "table-dynamic.appspot.com",
  messagingSenderId: "585933190667",
  appId: "1:585933190667:web:0f709789be6b518c44790e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 