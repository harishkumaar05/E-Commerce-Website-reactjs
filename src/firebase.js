// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyC9YNNdnLSJciGvLcmp4L85rYdsxCZ__OM",
  authDomain: "ecommerce-website-1470a.firebaseapp.com",
  projectId: "ecommerce-website-1470a",
  storageBucket: "ecommerce-website-1470a.appspot.com",
  messagingSenderId: "97850093413",
  appId: "1:97850093413:web:f441e57d9df88d5dbe7b8c",
  measurementId: "G-WYJTRD0YNN"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };