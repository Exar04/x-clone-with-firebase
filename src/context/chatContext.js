import { query, where, onSnapshot, collection, doc, updateDoc, arrayUnion, getDoc, serverTimestamp } from "firebase/firestore";
import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../config/firebase";
import { useLoggedInUserInfo } from "../hooks/userHandler";
import { useAuth } from "./authContext";

const ChatContext = createContext()

export function useChat() {
    return useContext(ChatContext)
}

export function ChatProvider({ children }) { 

    const { currentUser } = useAuth()
    const { permanentUsernameOfLoggedInUser, userIdOfLoggedInUser } = useLoggedInUserInfo()
    const chatCollectionRef = collection(db, "chats");
    const usersCollectionRef = collection(db, "users");
    const conversationsCollectionRef = collection(db, "conversations");

    const [conversationList, setConversationList] = useState([ ])

    const [allChats, setAllChats] = useState({ })

    async function sendMessageToServer(ChatId, message) {
       const UserDocRef = doc(db, "conversations", ChatId);
       const objsss = { userId: userIdOfLoggedInUser,username: permanentUsernameOfLoggedInUser, data:message}
       await updateDoc(UserDocRef, {
         messages: arrayUnion(objsss),
       })

      // setAllChats(prevState => ({
      //       ...prevState,
      //       [ChatId]: {
      //           ...prevState[ChatId], 
      //           messages: [
      //               ...(prevState[ChatId]?.messages || []),
      //               {userid: userIdOfLoggedInUser, username: permanentUsernameOfLoggedInUser, data: message}
      //           ]
      //       }
      //   }));
    }

    
    async function getChatsOfChatId(ChatId) {
      var unsubscribe;
      try {
        const queryConvo = doc(conversationsCollectionRef, ChatId);
        const queryConvoSnapshot = await getDoc(queryConvo);
        if (!queryConvoSnapshot.empty) {
          // const doc = queryConvoSnapshot.docs[0];
          const data = queryConvoSnapshot.data();
          setAllChats((prevState) => ({
            ...prevState,
            [ChatId]: { ...data },
          }));
        }
      } catch (err) {
        console.error(err);
      }

      return () => {
        unsubscribe();
      };
    }

    function getConversationList() {
      var listOfDocs = [];
      var unsubscribe;
      try {
        const queryUser = query( usersCollectionRef, where("userId", "==", currentUser.uid))

        unsubscribe =  onSnapshot(queryUser,(snapshot) => {
           snapshot.forEach((doc) => {
            const data = doc.data();
            const userChats = data.conversationList
            const id = doc.id;
            listOfDocs.push( ...userChats );
            console.log(userChats)
          })
           setConversationList(listOfDocs)
          listOfDocs = [];
        })
      } catch (err) {
        console.error(err);
      }

      return () => {
        unsubscribe();
      };
    }

    useEffect(() => {
      getConversationList()

      // this is used to make chat realtime
        const queryMessages = query(conversationsCollectionRef);
        var listOfMess = []
        onSnapshot(queryMessages, (snapshot) => {
          snapshot.forEach((doc) => {
            const messages = doc.data().messages;
            const convoid = doc.id;
            listOfMess.push({convoid, messages});
          });
          console.log(listOfMess, "mess")
          listOfMess.map((doc) => {
            setAllChats((prevState) => ({
              ...prevState,
              [doc.convoid]: { messages: doc.messages },
            }));
              // console.log(doc.convoid)
          });
            console.log(allChats, "oriko")
          listOfMess = []
        });
    }, [])

    useEffect(() => { console.log(allChats)},[allChats])


    const value = {
        conversationList,
        setConversationList,
        allChats,
        setAllChats,
        getChatsOfChatId,
        sendMessageToServer
    }

    return(
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}
