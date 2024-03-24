import React, { useContext, useEffect, useState } from "react"
import {auth, db} from "../config/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useNavigate } from "react-router"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [pending, setPending] = useState(true)

    const createNewUser = async (userId, permanentUsername, email) => {
      try {
        await addDoc(collection(db, "users"), {
          userId,
          permanentUsername,
          email,
          username: "",
          profileImage:"",
          backgroundImage:"",
          profiession: "",
          Birthdate: "",
          bio: "",
          createdAt: serverTimestamp(),
          followers: [],
          following: [],
          accountPrivate: false,
        });
        console.log("user created");
      } catch (err) {
        console.error(err);
      }
    };
    async function signup(email, password, username) {
      try{

      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      createNewUser(user.uid, username, email);
      return user
      } catch(err) {
        throw err
      }
    }

    async function login(email, password) {
      return await signInWithEmailAndPassword(auth, email, password);
    }

    function logOut() {
        return signOut(auth)
    }

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
        setPending(false);
      });

      const cachedUser = auth.currentUser;
      if (cachedUser) {
        setCurrentUser(cachedUser);
        setPending(false);
      }

      return unsubscribe;
    }, []);

    const value = {
      setCurrentUser,
      currentUser,
      signup,
      login,
      logOut,
    };

    if (pending) {
      return <div className=" bg-black w-screen h-screen flex justify-center items-center text-white font-mono" style={{animation: "", fontSize:'5vw'}}>
        ConnectSphere
      </div>
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}