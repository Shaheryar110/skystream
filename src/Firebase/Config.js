// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjW_yDuqhKJSPmZt41qraMqa_2Myk_5Xo",
  authDomain: "flight-booking-cbba1.firebaseapp.com",
  projectId: "flight-booking-cbba1",
  storageBucket: "flight-booking-cbba1.appspot.com",
  messagingSenderId: "146654869432",
  appId: "1:146654869432:web:c813cea63858021c04c14d",
  measurementId: "G-YF53SZE4CP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
