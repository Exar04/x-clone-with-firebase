import { addDoc, collection, onSnapshot, query, serverTimestamp, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { useAuth } from "../context/authContext";
import { useLoggedInUserInfo } from "./userHandler";

export const usePostHandler = () => {
  const { currentUser } = useAuth();
  const postCollectionRef = collection(db, "posts");
  const [TimelineForYouposts, setTimelineForYouPosts] = useState([])
  const [LoggedInUserPosts, setLoggedInUserPosts] = useState([])
  const [UserPosts, setUserPosts] = useState([])
  const { usernameOfLoggedInUser, permanentUsernameOfLoggedInUser } = useLoggedInUserInfo()


  const sendPost = async (text) => {
    if (text === "") return

    await addDoc(postCollectionRef, {      
      userId: currentUser.uid,
      username: usernameOfLoggedInUser,
      permanentUsername: permanentUsernameOfLoggedInUser,
      data: text,
      images: [],
      createdAt: serverTimestamp(),
    });
  };





  const getTimelineForYouPosts = async () => {
    var listOfDocs = [];
    var unsubscribe;
    try {
      const queryPosts = query(postCollectionRef);

      unsubscribe = onSnapshot(queryPosts, (snapshot) => {
        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          listOfDocs.push({ ...data, id });
        });
        setTimelineForYouPosts(listOfDocs);
        listOfDocs = []
      })
    } catch (err) {
      console.error(err);
    }

    return () => {
      unsubscribe()
    }
  };



  const getTimelineFollowingPosts = async () => {};

  const getLoggedInUserPosts = async() => {
    var unsubscribe 
    let listOfDocs = []
    try{
      const queryGetUserPosts = query(postCollectionRef, where("userId", "==", currentUser.uid))

      unsubscribe = onSnapshot(queryGetUserPosts, (snapshot) => {
        snapshot.forEach((doc) => {
          const data = doc.data()
          const id = doc.id
          listOfDocs.push({...data, id})
        })
        setLoggedInUserPosts([...listOfDocs])
        listOfDocs = []
      })
    } catch(err){
      console.error(err)
    }

    return () => {
      unsubscribe()
    }
  }

  const getUserPosts = async( permanentUsername, callback ) => {

    var unsubscribe 
    let listOfDocs = []
    try{
      const queryGetUserPosts = query(postCollectionRef, where("permanentUsername", "==", permanentUsername))

      unsubscribe = onSnapshot(queryGetUserPosts, (snapshot) => {
        snapshot.forEach((doc) => {
          const data = doc.data()
          const id = doc.id
          listOfDocs.push({...data, id})
        })
        callback(listOfDocs)
      })
    } catch(err){
      console.error(err)
    }

    return () => {
      unsubscribe()
    }

  }


  var runOnce = true 
  useEffect(() => {
    if  (runOnce) {
      runOnce = false 
      getTimelineForYouPosts()
      getLoggedInUserPosts()
    }
  },[])

  return { sendPost, getTimelineFollowingPosts, getTimelineForYouPosts, LoggedInUserPosts, TimelineForYouposts, getUserPosts };
}
