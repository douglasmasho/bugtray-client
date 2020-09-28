import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";


var firebaseConfig = {
    apiKey: "AIzaSyAMaTvGRQakax2p-ZhaPwwoyWD90wmJhug",
    authDomain: "bugtray-b4725.firebaseapp.com",
    databaseURL: "https://bugtray-b4725.firebaseio.com",
    projectId: "bugtray-b4725",
    storageBucket: "bugtray-b4725.appspot.com",
    messagingSenderId: "321939878585",
    appId: "1:321939878585:web:0f5e00c476588701bce168",
    measurementId: "G-MS9T2X1Q5K"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

export default firebase;