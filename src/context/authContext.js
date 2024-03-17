import React, { useContext, useEffect, useState } from "react"
import {auth} from "../config/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
// import { useCreateUser } from "../hooks/CreateUser"


const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [pending, setPending] = useState(true)

    function signup(email, password) {
      return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
      return signInWithEmailAndPassword(auth, email, password);
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
      return <div className=" bg-black w-screen h-screen"></div>
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}