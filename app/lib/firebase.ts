import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXkD3pEd-vhl1VyhsMPjsdC05dKCIZaJM",
  authDomain: "erishop-468d0.firebaseapp.com",
  projectId: "erishop-468d0",
  storageBucket: "erishop-468d0.appspot.com",
  messagingSenderId: "7901401399",
  appId: "1:7901401399:web:b378f0549d857c484f4ab2",
  measurementId: "G-15X5LB1YYV",
};

// init app
const app = initializeApp(firebaseConfig);

// firestore
export const db = getFirestore(app);