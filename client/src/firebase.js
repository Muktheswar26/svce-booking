// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getDatabase} from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsVCf5LA-nxolesxoQZ3O9VVxhXGMKBCg",
  authDomain: "svce-booking.firebaseapp.com",
  databaseURL: "https://svce-booking-default-rtdb.firebaseio.com",
  projectId: "svce-booking",
  storageBucket: "svce-booking.appspot.com",
  messagingSenderId: "386906597407",
  appId: "1:386906597407:web:c557f3cac8a6e63191cd2a",
  measurementId: "G-KXZG1E2888"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
const database = getDatabase()
export {app,auth,database}