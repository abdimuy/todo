// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  onSnapshot,
  doc,
  setDoc,
  addDoc,
  query,
  where,
  orderBy,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgDOo-ULtOwGo-IE-DgdMQk9KrLaz1ikc",
  authDomain: "todo-792d2.firebaseapp.com",
  projectId: "todo-792d2",
  storageBucket: "todo-792d2.appspot.com",
  messagingSenderId: "392469993028",
  appId: "1:392469993028:web:cb4bdc5155f83b65c84e11",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const firestore = {
  collection,
  getDocs,
  getDoc,
  onSnapshot,
  doc,
  setDoc,
  addDoc,
  query,
  where,
  orderBy,
  Timestamp,
  updateDoc,
};

export const auth = getAuth(app);
