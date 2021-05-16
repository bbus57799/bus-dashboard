import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1HWzM2Ac2U0Se2upiCxvF9yKGrFe_YJY",
  authDomain: "bus-dashboard-12aad.firebaseapp.com",
  projectId: "bus-dashboard-12aad",
  storageBucket: "bus-dashboard-12aad.appspot.com",
  messagingSenderId: "1024758108522",
  appId: "1:1024758108522:web:565d31143af7a5259a9513",
  measurementId: "G-L21M94PQ90",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
