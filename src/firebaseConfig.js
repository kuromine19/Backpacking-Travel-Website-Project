// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
// import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyB8DO78VsNIWPL8LsZbvhZZpDeE36dpWCU",
  authDomain: "backtravel-a394a.firebaseapp.com",
  projectId: "backtravel-a394a",
  storageBucket: "backtravel-a394a.appspot.com",
  messagingSenderId: "202983024439",
  appId: "1:202983024439:web:a24221777eb9bd1f395cb2"
};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
db.settings({timestampInSnapshots: true, merge: true});


