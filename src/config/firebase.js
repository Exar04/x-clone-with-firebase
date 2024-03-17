import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBYjhCo4I1YwP8SayV0dNaQRLblYa_82k8",
  authDomain: "x-clone-with-firebase.firebaseapp.com",
  projectId: "x-clone-with-firebase",
  storageBucket: "x-clone-with-firebase.appspot.com",
  messagingSenderId: "300123492808",
  appId: "1:300123492808:web:3426fe8da57b562ff9b0fd"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
// export const db = getFirestore(app)