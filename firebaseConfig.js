// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
// import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
// apiKey: "AIzaSyDVkupis1COGwYtvPMKSuxLmn4Sz2DzJSE",
// authDomain: "backtravel-119df.firebaseapp.com",
// projectId: "backtravel-119df",
// storageBucket: "backtravel-119df.appspot.com",
// messagingSenderId: "1044383220617",
// appId: "1:1044383220617:web:1d3c87ecb1158e6861d758",
// measurementId: "G-QXG06FKSRV"
// };

// const firebaseConfig = {
//     apiKey: "AIzaSyDcEfGBjePYOJxUz2UNzylt-CkQZG2urDA",
//     authDomain: "backtravel-25b70.firebaseapp.com",
//     projectId: "backtravel-25b70",
//     storageBucket: "backtravel-25b70.appspot.com",
//     messagingSenderId: "1067007016912",
//     appId: "1:1067007016912:web:53c3b22b8a9d3e5e4503d5"
//   };


// const firebaseConfig = {
//   apiKey: "AIzaSyCnr3Zzn5HHaOCcF5p51-Bjib0zTKJP6xU",
//   authDomain: "backtravel1-d0963.firebaseapp.com",
//   projectId: "backtravel1-d0963",
//   storageBucket: "backtravel1-d0963.appspot.com",
//   messagingSenderId: "346831568530",
//   appId: "1:346831568530:web:fcfaf2207b65db06c7b04b"
// };

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


