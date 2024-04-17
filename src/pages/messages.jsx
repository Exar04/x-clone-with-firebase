import { useEffect, useRef } from "react"
import { useState } from "react"
import { useChat } from "../context/chatContext"
import { useChatHandler } from "../hooks/messageHandler"

export function Messages() {
    const { allChats, setAllChats, conversationList} = useChatHandler()
    const {uso, susuy} = useChat()

    const [IdOfOpenedChat, setIdOfOpenedChat] = useState(null)

    const listOfUsersDiv = conversationList.map((user, index) => 
        <div key={index} role={"button"} onClick={() => setIdOfOpenedChat(user[index].chatId)} className="bg-black h-24 flex-none text-xl border-0.5 border-slate-600 hover:bg-slate-500 rounded-md text-white flex p-4 m-4">
            <div className="bg-gray-700 w-14 h-14 rounded-full"></div>
            <div className=" pl-3">
                <div className=" font-bold">{user[index].chatName}</div>
                <div className=" text-gray-400">{user[index].recentMessage}</div>
            </div>
        </div>
    )

    
    return(
        <div className="flex lg:flex-row flex-col">
            <div className="bg-zinc-950 h-screen lg:basis-2/6 border-r-0.5 border-0 border-slate-600 text-white justify-center overflow-scroll no-scrollbar">
                {listOfUsersDiv}
            </div>

         <div className="bg-zinc-950 lg:h-screen lg:block hidden lg:basis-4/6 ">
               {IdOfOpenedChat? <Chat IdOfOpenedChat={IdOfOpenedChat} setIdOfOpenedChat={setIdOfOpenedChat} ChatsOfSelectedUserOrGroup={allChats[IdOfOpenedChat]} setAllChats={setAllChats}/>: <div className=" text-white text-3xl font-mono flex justify-center items-center w-full h-full">No chats Opened</div>}
         </div>
            { (IdOfOpenedChat) ? 
         <div className="h-screen w-screen bg-black absolute top-0 left-0 lg:hidden z-20">
                <Chat IdOfOpenedChat={IdOfOpenedChat} setIdOfOpenedChat={setIdOfOpenedChat} ChatsOfSelectedUserOrGroup={allChats[IdOfOpenedChat]}/>
         </div>: ""}
        </div>

    )
}

function Chat(props) {

    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

    const [inputData, setInputData] = useState([])
    const inputRef = useRef()

    function ResetInputData() {
        setInputData("")
        inputRef.current.value = ""
    }
    
    function sendMessage() {
        //send messege to server

        // add this message to list chat
          props.setAllChats(prevState => ({
            ...prevState,
            [props.IdOfOpenedChat]: {
                ...prevState[props.IdOfOpenedChat], 
                chats: [...prevState[props.IdOfOpenedChat].chats, {userid: 1, username: "yash", data: inputData}]
            }
        }));

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

    const divOfMessages = props.ChatsOfSelectedUserOrGroup.chats.map((chats, index) => (
        <div key={index}>
            {chats.username == "yash" ?
                <div className="  w-full h-auto ">
                    <div className=" text-white text-lg w-fit h-auto px-2 bg-sky-500 rounded-xl mt-1 ml-2 absolute right-2" style={{ maxWidth: "50%", wordWrap: "break-word" }}> {chats.data}</div>
                    <div className="ml-2 px-2 my-1 text-lg w-fit h-auto" style={{ maxWidth: "50%", wordWrap: "break-word" }} >{chats.data}</div>
                </div>
                :
                <div className=" ">
                    <div className=" text-white text-lg w-fit h-auto px-2 bg-sky-500 rounded-xl mt-1 ml-2 relative left-0 " style={{ maxWidth: "50%", wordWrap: "break-word" }}> {chats.data}</div>
                </div>
            }
        </div>
    ))

    return (

         <div className={`flex flex-col ${isKeyboardOpen? "h-3/5":"h-full"} w-full fixed lg:relative `}>
            <div className=" bg-black border-b-0.5 text-white p-4 text-lg flex items-center">
                <img role={"button"} onClick={() => props.setIdOfOpenedChat(null)} className=" md:w-10 md:h-10 w-6 h-6 ml-2 hover:bg-zinc-800 rounded-full p-2" src="https://img.icons8.com/ios-filled/100/FFFFFF/back.png" alt="back" /> 
                <div className=" ml-3">Username of chatter</div>
                  
            </div>
            <div className=" flex-grow bg-black overflow-scroll no-scrollbar relative">
                {divOfMessages}
            </div>

            <div className={`bg-black border-t-0.5 p-2 text-white flex items-center relative ${ isKeyboardOpen? "bottom-7": ""}`}>
                <textarea ref={inputRef} onChange={(e) => {setInputData(e.target.value) }} className="w-full h-fit -3/4 rounded-full pl-6 md:pt-5 pt-2 bg-black border-0.5 outline-none border-slate-500"></textarea>
                <div role={"button"} onClick={() => sendMessage()} className=" absolute top-4.5 right-4 p-2 rounded-full hover:bg-zinc-800 transition duration-300">
                    <img className=" md:w-10 md:h-10 w-6 h-6" src="https://img.icons8.com/fluency/96/filled-sent.png" alt="filled-sent"/>
                </div>
            </div>
         </div>

    )
}