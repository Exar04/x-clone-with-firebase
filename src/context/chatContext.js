import { query, where, onSnapshot, collection, doc, updateDoc, arrayUnion, getDoc, serverTimestamp } from "firebase/firestore";
import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../config/firebase";
import { useLoggedInUserInfo, useUserHandler } from "../hooks/userHandler";
import { useAuth } from "./authContext";

const ChatContext = createContext()

export function useChat() {
    return useContext(ChatContext)
}

export function ChatProvider({ children }) { 

    const { currentUser } = useAuth()
    const { permanentUsernameOfLoggedInUser, userIdOfLoggedInUser } = useLoggedInUserInfo()
    const { getUser_Pfp_from_Username_Displayname } = useUserHandler()
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
        const queryUser = query(
          usersCollectionRef,
          where("userId", "==", currentUser.uid)
        );

        unsubscribe =  onSnapshot(queryUser, (snapshot) => {
          snapshot.forEach((doc) => {
            const userChats = doc.data().conversationList;
            // const userChats = data.conversationList
            const id = doc.id;
            userChats.profilePic = ""
            listOfDocs.push(...userChats)
          });
          Promise.all(listOfDocs.map((data, index) => {
            return new Promise((resolve, reject) => {
                getUser_Pfp_from_Username_Displayname(data.chatName, (pfpUrl) => {
                    console.log(pfpUrl);
                        listOfDocs[index].profilePic = pfpUrl;
                    resolve();
                });
            });
        })).then(() => {
            // After all profilePic assignments are done, setConversationList
            setConversationList(listOfDocs);
            listOfDocs = [];
        }).catch((error) => {
            console.error(error);
        });
        });
      } catch (err) {
        console.error(err);
      }


      return () => {
        unsubscribe();
      };
    }

    useEffect(() => {
      getConversationList()
   }, [])

   useEffect(() => {
        const queryMessages = query(conversationsCollectionRef, where("usersInvolved", "array-contains", permanentUsernameOfLoggedInUser));
        var listOfMess = []
        onSnapshot(queryMessages, (snapshot) => {
          snapshot.forEach((doc) => {
            const messages = doc.data().messages;
            const convoid = doc.id;
            listOfMess.push({convoid, messages});
          });

          listOfMess.map((doc) => {
            setAllChats((prevState) => ({
              ...prevState,
              [doc.convoid]: { messages: doc.messages },
            }))
          })
          listOfMess = []
        });
   }, [permanentUsernameOfLoggedInUser])


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
