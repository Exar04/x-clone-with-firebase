import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYjhCo4I1YwP8SayV0dNaQRLblYa_82k8",
  authDomain: "x-clone-with-firebase.firebaseapp.com",
  projectId: "x-clone-with-firebase",
  storageBucket: "x-clone-with-firebase.appspot.com",
  messagingSenderId: "300123492808",
  appId: "1:300123492808:web:3426fe8da57b562ff9b0fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)