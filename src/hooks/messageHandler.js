import { addDoc, arrayUnion, collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router"
import { db } from "../config/firebase";
import { useAuth } from "../context/authContext";
import { useChat } from "../context/chatContext";
import { useLoggedInUserInfo, useUserHandler } from "./userHandler";

export const useChatHandler = () => {
    const { currentUser } = useAuth()
    const { conversationList, setConversationList, allChats, setAllChats} = useChat()
    const { userIdOfLoggedInUser, permanentUsernameOfLoggedInUser } = useLoggedInUserInfo()
    const navigate = useNavigate();
    const chatCollectionRef = collection(db, "chats");
    const usersCollectionRef = collection(db, "users");

     const forwardToChatOfUser = async (permanentUsername) => {
       // before navigateing check if user alerady has a chat with this person in database
       // if there is already a chat available load that chat in to the list of chats and then forward
       // if there is no previous conversation with the person then create a new chat for this user and then forward it

       console.log(conversationList)
    //    conversationList.forEach((convo, i) => {
    //     console.log(convo[i])
    //     console.log(i)
    //      if (convo[i].chatName == permanentUsername) {
    //        navigate(`/home/messages/${permanentUsername}`);
    //        return;
    //      }
    //    });

       // before creating a refrence of chat in user data we need to create a doc for messages
       const convoDocRef = await addDoc(collection(db, "conversations"), {
        messages:[],
       })
       const convoDocId = convoDocRef.id;

       // create a conversation ref in userData
       const UserDocRef = doc(db, "users", userIdOfLoggedInUser);
       var objsss = {chatId:convoDocId, chatName:permanentUsername}
       await updateDoc(UserDocRef, {
         conversationList: arrayUnion(objsss),
       })
       setConversationList( ...conversationList, objsss)
       
       navigate(`/home/messages/${permanentUsername}`);
     };

    return { forwardToChatOfUser, allChats, setAllChats, conversationList }
}