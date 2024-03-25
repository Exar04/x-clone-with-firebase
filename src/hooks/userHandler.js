import { addDoc, collection, onSnapshot, query, serverTimestamp, where, updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { useAuth } from "../context/authContext";

export const useUserHandler = () => {
  const { currentUser } = useAuth();
  const usersCollectionRef = collection(db, "users");

  const getUser_Pfp_Username_Displayname = async () => {

  }

  const followOrUnFollowThisUser = async (userIdOfLoggedInUser, userIdOfOtherUser, permanentUsernameOfLoggedInUser, permanentUsernameOfOtherUser,  logged_in_user_follows_this_user) => {
    const userDocRef1 = doc(db, "users", userIdOfLoggedInUser);
    const userDocRef2 = doc(db, "users", userIdOfOtherUser);

    if (!logged_in_user_follows_this_user) {
      console.log(logged_in_user_follows_this_user)
    updateDoc(userDocRef1 , {
      following: arrayUnion(permanentUsernameOfOtherUser)
    });
    updateDoc(userDocRef2,{
      followers: arrayUnion(permanentUsernameOfLoggedInUser)
    })

   } else {
    updateDoc(userDocRef1 , {
      following: arrayRemove(permanentUsernameOfOtherUser)
    });
    updateDoc(userDocRef2,{
      followers: arrayRemove(permanentUsernameOfLoggedInUser)
    })
   }

  }

  const getUserProfileData = async (permanentUsername, callback) => {
    var unsubscribe;
    try {
      const userQuery = query(usersCollectionRef,where("permanentUsername", "==", permanentUsername))

      unsubscribe = onSnapshot(userQuery, (snapshot) => {
        let userData = null;
        if (snapshot.size === 1) {
          const doc = snapshot.docs[0];
          userData = { id: doc.id, ...doc.data() };
        }
      callback(userData);
      })
    } catch (err) {
      console.error(err);
    }

    return () => {
      unsubscribe()
    } 
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

  const getSearchedUser = async ( permanentUsername ,callback) => {
    var listOfDocs = [];
    var unsubscribe;
    try {
      const queryUsers = query(usersCollectionRef, where("permanentUsername", ">=", permanentUsername), where("permanentUsername", "<", permanentUsername + "\uf8ff"));

      unsubscribe = onSnapshot(queryUsers, (snapshot) => {
        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          listOfDocs.push({ ...data, id });
        });
        callback(listOfDocs)

      })
    } catch (err) {
      console.error(err);
    }

    return () => {
      unsubscribe()
    }
  }

  return { getSearchedUser, getUserProfileData, followOrUnFollowThisUser };
};

export const useLoggedInUserInfo = () => {
  const [changableUsernameOfLoggedInUser, setChangableUsernameOfLoggedInUser] = useState("")
  const [permanentUsernameOfLoggedInUser, setPermanentUsernameOfLoggedInUser] = useState("")
  const [userIdOfLoggedInUser, setUserIdOfLoggedInUser] = useState("")
  const [listOfFollowersOfLoggedInUser, setListOfFollowersOfLoggedInUser] = useState([])
  const [listOfFollowingsOfLoggedInUser, setListOfFollowingsOfLoggedInUser ] = useState([])
  const [PfpImageUrlOfLoggedInUser, setPfpImageUrlOfLoggedInUser] = useState("")
  const [BackgroundImageUrlOfLoggedInUser, setBackgroundImageUrlOfLoggedInUser] = useState("")
  const [userBio, setUserBio] = useState("")

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
        setPermanentUsernameOfLoggedInUser(userData.permanentUsername)
        setUserIdOfLoggedInUser(userData.id)
        setUserBio(userData.bio)
        setChangableUsernameOfLoggedInUser(userData.username)
        setListOfFollowersOfLoggedInUser(userData.followers)
        setListOfFollowingsOfLoggedInUser(userData.following)
        setPfpImageUrlOfLoggedInUser(userData.profileImage)
        setBackgroundImageUrlOfLoggedInUser(userData.backgroundImage)
      })
    } catch(err){
      console.error(err)
    }
    return () => unsubscribe()
  }

  useEffect(() => {
    getUserData()
  }, [])

  return { changableUsernameOfLoggedInUser, permanentUsernameOfLoggedInUser, userBio, listOfFollowersOfLoggedInUser, listOfFollowingsOfLoggedInUser, userIdOfLoggedInUser, PfpImageUrlOfLoggedInUser, BackgroundImageUrlOfLoggedInUser }
}