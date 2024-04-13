import { useEffect } from "react"
import { useState } from "react"

export function Messages() {
    const [IdOfOpenedChat, setIdOfOpenedChat] = useState(22)
    const [Users, setUsers] = useState([
        {id:1, Username:"yash", handleId:"yash123", img:"", recentMessage:"hey wasup"},
        {id:2, Username:"Om", handleId:"om78osho", img:"", recentMessage:"hey wasup"},
        {id:3, Username:"Vinyas", handleId:"viniDev69", img:"", recentMessage:"hey wasup"},
        {id:4, Username:"sajal", handleId:"demonmon", img:"", recentMessage:"hey wasup"},
    ])

    const listOfUsersDiv = Users.map((user, index) => 
        <div key={index} role={"button"} className="bg-black h-24 flex-none text-xl border-0.5 border-slate-600 hover:bg-slate-500 rounded-md text-white flex p-4 m-4">
            <div className="bg-gray-700 w-14 h-14 rounded-full"></div>
            <div className=" pl-3">
                <div className=" font-bold">{user.Username}</div>
                <div className=" text-gray-400">{user.recentMessage}</div>
            </div>
        </div>
    )

    return(
        <div className="flex lg:flex-row flex-col">
            <div className="bg-zinc-950 h-screen lg:basis-2/6 border-r-0.5 border-0 border-slate-600 text-white justify-center overflow-scroll no-scrollbar">
                {listOfUsersDiv}
            </div>

         <div className="bg-zinc-950  h-screen lg:basis-4/6 ">
                <Chat />
         </div>
            { (IdOfOpenedChat) ? 
         <div className="h-screen w-screen bg-black absolute top-0 left-0 lg:hidden z-20">
                <Chat />
         </div>: ""}
        </div>

    )
}

function Chat() {
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsKeyboardOpen(!isKeyboardOpen);
        };

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [isKeyboardOpen])

    return (

         <div className={`flex flex-col ${isKeyboardOpen? "h-3/5":"h-full"} w-full fixed lg:relative`}>
            <div className=" bg-black border-b-0.5 text-white p-4 text-lg"> Username of chatter </div>
            <div className=" flex-grow bg-black overflow-scroll no-scrollbar relative">
                <div className=" ">
                    <div className=" text-white text-lg w-fit h-auto px-2 bg-sky-500 rounded-xl mt-1 ml-2 relative left-0 " style={{maxWidth: "50%", wordWrap:"break-word"}}> hheals</div>
                </div>
                <div className="  w-full h-auto ">
                    <div className=" text-white text-lg w-fit h-auto px-2 bg-sky-500 rounded-xl mt-1 ml-2 absolute right-2" style={{maxWidth: "50%", wordWrap:"break-word"}}> wok</div>
                    <div className="ml-2 px-2 text-lg w-fit h-auto" style={{maxWidth: "50%", wordWrap:"break-word"}} >wok</div>
                </div>
                <div className=" ">
                <div className=" text-white text-lg w-fit h-auto px-2 bg-sky-500 rounded-xl mt-1 ml-2 relative left-0 " style={{maxWidth: "50%", wordWrap:"break-word"}}> nom</div>
                </div>
                <div className="  w-full h-auto ">
                <div className=" text-white text-lg w-fit h-auto px-2 bg-sky-500 rounded-xl mt-1 ml-2 absolute right-2" style={{maxWidth: "50%", wordWrap:"break-word"}}> arms</div>
                    <div className="ml-2 px-2 text-lg w-fit h-auto" style={{maxWidth: "50%", wordWrap:"break-word"}} >wok</div>
                </div>

            </div>

            <div className={`bg-black border-t-0.5 p-2 text-white flex items-center relative ${ isKeyboardOpen? "bottom-7": ""}`}>
                <textarea className="w-full h-fit -3/4 rounded-full pl-6 md:pt-5 pt-2 bg-black border-0.5 outline-none border-slate-500"></textarea>
                <div className=" absolute top-4.5 right-4 p-2 rounded-full hover:bg-zinc-800 transition duration-300">
                    <img className=" md:w-10 md:h-10 w-6 h-6" src="https://img.icons8.com/fluency/96/filled-sent.png" alt="filled-sent"/>
                </div>
            </div>
         </div>

    )
}