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

     const forwardToChatOfUser = async (useridOfOtherUser, permanentUsername) => {
       // before navigateing check if user alerady has a chat with this person in database
       // if there is already a chat available load that chat in to the list of chats and then forward
       // if there is no previous conversation with the person then create a new chat for this user and then forward it

       console.log(conversationList)
        for (const convo of conversationList) {
         if (convo.chatName == permanentUsername) {
            console.log(convo.chatName, permanentUsername)
           navigate(`/home/messages/${permanentUsername}`);
           return
         }
       }

       // before creating a refrence of chat in user data we need to create a doc for messages

       console.log("it still went funcking down")
       const convoDocRef = await addDoc(collection(db, "conversations"), {
        messages:[],
       })
       const convoDocId = convoDocRef.id;

       // create a conversation ref in userData
       const UserDocRefOfLoggedInUser = doc(db, "users", userIdOfLoggedInUser);
       const UserDocRefOfOtherUser = doc(db, "users", useridOfOtherUser);
       var objsss1 = {chatId:convoDocId, chatName:permanentUsername}
       var objsss2 = {chatId:convoDocId, chatName: permanentUsernameOfLoggedInUser}

       await updateDoc(UserDocRefOfLoggedInUser, {
         conversationList: arrayUnion(objsss1),
       })
       await updateDoc(UserDocRefOfOtherUser, {
         conversationList: arrayUnion(objsss2),
       })
       setConversationList( [...conversationList, objsss1])
       
       navigate(`/home/messages/${permanentUsername}`);
     };

    return { forwardToChatOfUser }
}