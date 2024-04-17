import { query, where, onSnapshot, collection } from "firebase/firestore";
import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../config/firebase";
import { useAuth } from "./authContext";

const ChatContext = createContext()

export function useChat() {
    return useContext(ChatContext)
}

export function ChatProvider({ children }) { 

    const { currentUser } = useAuth()
    const chatCollectionRef = collection(db, "chats");
    const usersCollectionRef = collection(db, "users");

    const [conversationList, setConversationList] = useState([
        // { id:2, chatId:1, Username:"Vinyas", handleId:"viniDev69", img:"", recentMessage:"hey wasup"},
        // {id:3, chatId:2, Username:"Om", handleId:"om78osho", img:"", recentMessage:"hey wasup"},
        // {id:4, chatId:3, Username:"sajal", handleId:"demonmon", img:"", recentMessage:"hey wasup"},
    ])

    const [allChats, setAllChats] = useState({
        // the key is the id of chat
        // 1:{
        //     isGroupChat:false,
        //     usersInChatGroup: [{
        //         userId: 2,
        //         username: "vinyas"
        //     },
        //     {
        //         userId:1,
        //         username:"yash"
        //     }
        //     ],
        //     chats: [
        //         {userid:2,username:"vinyas", data: "hi"},
        //         {userid:1,username:"yash",  data:"hey was up?"},
        //         {userid:1,username:"yash",  data:"how you doing"},
        //         {userid:2,username:"vinyas",  data:"nothing much"}
        //     ],
        // },
        // 2:{
        //     isGroupChat:false,
        //     usersInChatGroup: [{
        //         userId: 3,
        //         username: "om"
        //     },
        //     {
        //         userId:1,
        //         username:"yash"
        //     }
        //     ],
        //     chats: [
        //         {userid:1,username:"yash", data: "hi"},
        //         {userid:3,username:"om", data:"yoo"},
        //         {userid:1,username:"yash", data:"hehe"},
        //         {userid:3,username:"om", data:"hahaha"}
        //     ],
        // },
        // 3:{
        //     isGroupChat:false,
        //     usersInChatGroup: [{
        //         userId: 4,
        //         username: "sajal"
        //     },
        //     {
        //         userId:1,
        //         username:"yash"
        //     }
        //     ],
        //     chats: [
        //         {userid:1,username:"yash", data: "hi"},
        //         {userid:3,username:"om", data:"yoo"},
        //         {userid:1,username:"yash", data:"hehe"},
        //         {userid:3,username:"om", data:"hahaha"}
        //     ],
        // }
    })



    function getListOfChats() {
      var listOfDocs = [];
      var unsubscribe;
      try {
        const queryUser = query( usersCollectionRef, where("userId", "==", currentUser.uid))

        unsubscribe =  onSnapshot(queryUser, (snapshot) => {
           snapshot.forEach((doc) => {
            const data = doc.data();
            const userChats = data.conversationList
            const id = doc.id;
            listOfDocs.push({ ...userChats });
          });
          setConversationList(listOfDocs);
          listOfDocs = [];
        });
      } catch (err) {
        console.error(err);
      }

      return () => {
        unsubscribe();
      };
    }

    useEffect(() => {
      getListOfChats()
    }, [])
    

    const value = {
        conversationList,
        setConversationList,
        allChats,
        setAllChats
    }

    return(
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )


}
