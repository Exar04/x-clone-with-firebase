import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";


// const firebaseConfig = {
//   apiKey: "AIzaSyBYjhCo4I1YwP8SayV0dNaQRLblYa_82k8",
//   authDomain: "x-clone-with-firebase.firebaseapp.com",
//   projectId: "x-clone-with-firebase",
//   storageBucket: "x-clone-with-firebase.appspot.com",
//   messagingSenderId: "300123492808",
//   appId: "1:300123492808:web:3426fe8da57b562ff9b0fd"
// };

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID 
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)