import { addDoc, arrayRemove, arrayUnion, collection, doc, limit, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { useAuth } from "../context/authContext";
import { useLoggedInUserInfo } from "./userHandler";

export const usePostHandler = () => {
  const { currentUser } = useAuth();
  const postCollectionRef = collection(db, "posts");
  const [TimelineForYouposts, setTimelineForYouPosts] = useState([])
  const [TimelineFollowingposts, setTimelineFollowingPosts] = useState([])
  const [LoggedInUserPosts, setLoggedInUserPosts] = useState([])
  const [UserPosts, setUserPosts] = useState([])
  const { changableUsernameOfLoggedInUser, permanentUsernameOfLoggedInUser, listOfFollowingsOfLoggedInUser } = useLoggedInUserInfo()


  const sendPost = async (text) => {
    if (text === "") return

    await addDoc(postCollectionRef, {      
      userId: currentUser.uid,
      username: changableUsernameOfLoggedInUser,
      permanentUsername: permanentUsernameOfLoggedInUser,
      data: text,
      images: [],
      likes:[],
      shares:0,
      impressions:0,
      createdAt: serverTimestamp(),
    });
  };

  const likeOrDislikePost = async ( postId ,permanentUsernameOfLoggedInUser,  logged_in_user_already_liked_the_post) => {
    const PostDocRef = doc(db, "posts", postId);

    if (!logged_in_user_already_liked_the_post) {
    updateDoc(PostDocRef , {
      likes: arrayUnion(permanentUsernameOfLoggedInUser)
    })
   } else {
    updateDoc(PostDocRef , {
      likes: arrayRemove(permanentUsernameOfLoggedInUser)
    })
   }

  }

  const getTimelineForYouPosts = async () => {
    var listOfDocs = [];
    var unsubscribe;
    try {
      const queryPosts = query(postCollectionRef,orderBy('createdAt', 'desc'), limit(30));

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

  const getTimelineFollowingPosts = async () => {
    var listOfDocs = [];
    var unsubscribeCallbacks = [];
    
    try {
      // Use Promise.all to wait for all queries to resolve
      await Promise.all(
        listOfFollowingsOfLoggedInUser.map((user) => {
          return new Promise((resolve, reject) => {
            const queryPosts = query(
              postCollectionRef,
              where("permanentUsername", "==", user),
              orderBy('createdAt', 'desc'), limit(5),
            );
  
            // Subscribe to onSnapshot and keep track of unsubscribe callbacks
            const unsubscribe = onSnapshot(queryPosts, (snapshot) => {
              snapshot.forEach((doc) => {
                const data = doc.data();
                const id = doc.id;
                listOfDocs.push({ ...data, id });
              });
              resolve(); // Resolve the promise when this query completes
            });
            unsubscribeCallbacks.push(unsubscribe);
          });
        })
      );
  
      // After all queries are done, set the timelineFollowingPosts
      setTimelineFollowingPosts([...listOfDocs]);
      listOfDocs = [];
  
    } catch (err) {
      console.error(err);
    }
    // Return a function to unsubscribe all listeners
    return () => {
      unsubscribeCallbacks.forEach((unsubscribe) => unsubscribe());
    };
  };
  

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

  useEffect(() => {
    getTimelineFollowingPosts()
  }, [listOfFollowingsOfLoggedInUser])

  return { sendPost, getTimelineFollowingPosts, TimelineFollowingposts, LoggedInUserPosts, TimelineForYouposts, getUserPosts, likeOrDislikePost };
}
