import { useEffect, useRef } from "react"
import { useState } from "react"
import { useAuth } from "../context/authContext"
import { useChat } from "../context/chatContext"
import { useChatHandler } from "../hooks/messageHandler"
import { useLoggedInUserInfo, useUserHandler } from "../hooks/userHandler"

export function Messages() {
    const { allChats, setAllChats, conversationList, getChatsOfChatId} = useChat()
 
    const [IdOfOpenedChat, setIdOfOpenedChat] = useState(null)
    const [NameOfOpenedChat, setNameOfOpenedChat] = useState(null)

    useEffect(() => {
        // load the messages of opened chat in allChats
        if (IdOfOpenedChat != null && allChats[IdOfOpenedChat] == null) {
            getChatsOfChatId(IdOfOpenedChat)
        }
    }, [IdOfOpenedChat])

    const listOfUsersDiv = conversationList.map((user, index) => 
        <div key={index} role={"button"} onClick={() => {setIdOfOpenedChat(user.chatId); setNameOfOpenedChat(user.chatName)}} className=" flex-none flex items-center  text-xl border-0.5 border-slate-600  bg-black hover:bg-sky-600 hover:ring-2 ring-sky-300 inset-1 rounded-xl text-white p-3 m-2 transition duration-500 ease-in-out ">
            { user.profilePic? <img src={user.profilePic} className=" w-14 h-14 rounded-full"/>:<div className="bg-gray-700 w-14 h-14 rounded-full"></div>}
            <div className=" pl-3 ">
                <div className=" font-bold">{user.chatName}</div>
                {/* {/* <div className=" text-gray-400">{user.recentMessage}</div> */}
            </div>
        </div>
    )
    
    return(
        <div className="flex lg:flex-row flex-col">
            <div className="bg-zinc-950 h-screen lg:basis-2/6 border-r-0.5 border-0 border-slate-600 text-white justify-center overflow-scroll no-scrollbar">
                {listOfUsersDiv}
            </div>

         <div className="bg-zinc-950 lg:h-screen lg:block hidden lg:basis-4/6 ">
               {IdOfOpenedChat? <Chat IdOfOpenedChat={IdOfOpenedChat} NameOfOpenedChat={NameOfOpenedChat} setIdOfOpenedChat={setIdOfOpenedChat}  ChatsOfSelectedUserOrGroup={allChats[IdOfOpenedChat]} setAllChats={setAllChats}/>: <div className=" text-white text-3xl font-mono flex justify-center items-center w-full h-full">No chats Opened</div>}
         </div>
            { (IdOfOpenedChat) ? 
         <div className="h-screen w-screen bg-black absolute top-0 left-0 lg:hidden z-20">
                <Chat IdOfOpenedChat={IdOfOpenedChat} NameOfOpenedChat={NameOfOpenedChat} setIdOfOpenedChat={setIdOfOpenedChat} ChatsOfSelectedUserOrGroup={allChats[IdOfOpenedChat]}/>
         </div>: ""}
        </div>

    )
}

function Chat(props) {

    const { currentUser} = useAuth()
    const {sendMessageToServer, setAllChats, allChats} = useChat()
    const { permanentUsernameOfLoggedInUser, userIdOfLoggedInUser } = useLoggedInUserInfo()
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const [isTextareaFocused, setIsTextareaFocused] = useState(false);
    

    const [inputData, setInputData] = useState([])
    const inputRef = useRef()

    function ResetInputData() {
        setInputData("")
        inputRef.current.value = ""
    }
    
    function sendMessage() {
        sendMessageToServer(props.IdOfOpenedChat, inputData)
        ResetInputData()
    }

    useEffect(() => {
        const handleResize = () => {
            setIsKeyboardOpen(!isKeyboardOpen);
        };

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [isKeyboardOpen])

    const divOfMessages = allChats[props.IdOfOpenedChat] ? allChats[props.IdOfOpenedChat].messages.map((chats, index) => (
        <div key={index}>
            {chats.username == permanentUsernameOfLoggedInUser ?
                <div className="  w-full h-auto ">
                    <div className=" text-white text-lg w-fit h-auto px-2 bg-zinc-800 rounded-xl mt-1 ml-2 absolute right-2" style={{ maxWidth: "50%", wordWrap: "break-word" }}> {chats.data}</div>
                    <div className="ml-2 px-2 my-1 text-lg w-fit h-auto" style={{ maxWidth: "50%", wordWrap: "break-word" }} >{chats.data}</div>
                </div>
                :
                <div className=" ">
                    <div className=" text-white text-lg w-fit h-auto px-2 bg-sky-500 rounded-xl mt-1 ml-2 relative left-0 " style={{ maxWidth: "50%", wordWrap: "break-word" }}> {chats.data}</div>
                </div>
            }
        </div>
    )):<div></div> 

    return (

         <div className={`flex flex-col ${isKeyboardOpen? "h-3/5":"h-full"} w-full fixed lg:relative `}>
            <div className=" bg-black border-b-0.5 text-white p-4 text-lg flex items-center">
                <img role={"button"} onClick={() => props.setIdOfOpenedChat(null)} className=" w-8 h-8 ml-2 hover:bg-zinc-800 rounded-full p-1 md:p-2" src="https://img.icons8.com/ios-filled/100/FFFFFF/back.png" alt="back" /> 
                <div className=" ml-3">{props.NameOfOpenedChat}</div>
                  
            </div>
            <div className=" flex-grow bg-black overflow-scroll no-scrollbar relative mb-2">
                {divOfMessages}
            </div>

            <div className={`bg-black border-t-0.5 p-2 text-white flex items-center relative ${ isKeyboardOpen? "bottom-7": ""}`}>
                <textarea ref={inputRef} onFocus={() => { setIsTextareaFocused(true)}} onBlur={() => { setIsTextareaFocused(false)}} onChange={(e) => {setInputData(e.target.value) }} className={`w-full h-fit rounded-full pl-6 md:pt-5 ${ isTextareaFocused? "pt-5":""} bg-black border-0.5 outline-none border-slate-500 flex items-center`}></textarea>
                <div role={"button"} onClick={() => sendMessage()} className=" absolute top-4.5 right-4 p-2 rounded-full hover:bg-zinc-800 transition duration-300">
                    <img className=" md:w-10 md:h-10 w-6 h-6" src="https://img.icons8.com/fluency/96/filled-sent.png" alt="filled-sent"/>
                </div>
            </div>
         </div>

    )
}