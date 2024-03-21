import { addDoc, collection, onSnapshot, query, serverTimestamp, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { useAuth } from "../context/authContext";

export const useUserHandler = () => {
  const { currentUser } = useAuth();
  const usersCollectionRef = collection(db, "users");

  const getUser_Pfp_Username_Displayname = async () => {

  }

  const getAllUserProfileData = async () => {

  }

  const getUserNotifications = async(userId) => {

  }

  const changeUserProfilepic = async() => {

  }

  const changeUserProfileBackgroundPic = async() => {

  }
  // display name is the one that will be showin // username will be the @id used to add firends and stuff and it should be unique
  const changeDisplayName = async () => {

  }

  return { };
};

export const useUserInfo = () => {
  const [usernameOfLoggedInUser, setUsernameOfLoggedInUser] = useState("")
  const [permanentUsernameOfLoggedInUser, setPermanentUsernameOfLoggedInUser] = useState("")
  const [userBio, setUserBio] = useState("")
  const [postsOfLoggedInUser, setPostsOfLoggedInUser] = useState([])

  const usersCollectionRef = collection(db, "users");
  const { currentUser } = useAuth()

  const getUserData = async () => {
    var unsubscribe 
    try{
      const userQuery = query(usersCollectionRef,where("userId", "==", currentUser.uid))

      unsubscribe = onSnapshot(userQuery, (snapshot) => {

        let userData = null;
        if (snapshot.size === 1) {
          const doc = snapshot.docs[0];
          userData = { id: doc.id, ...doc.data() };
        }
        setUsernameOfLoggedInUser(userData.usernameOfLoggedInUser)
        setPermanentUsernameOfLoggedInUser(userData.permanentUsername)
        setUserBio(userData.bio)
        setUsernameOfLoggedInUser(userData.username)
      })
    } catch(err){
      console.error(err)
    }
    return () => unsubscribe()
  }

  useEffect(() => {
    getUserData()
  }, [])

  return { usernameOfLoggedInUser, permanentUsernameOfLoggedInUser, userBio }
}