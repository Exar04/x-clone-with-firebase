import { useState } from "react"

export function Messages() {
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
                <Chat />
        </div>

    )
}

function Chat() {
    return(
         <div className="bg-zinc-950  h-screen lg:basis-4/6 flex flex-col overflow-scroll no-scrollbar">
            <div className=" bg-black border-b-0.5 text-white p-4 text-lg"> Username of chatter </div>
            <div className=" flex-grow bg-black overflow-scroll">
            </div>
            <div className=" bg-black border-t-0.5 p-2 text-white">
                <textarea className="w-full h-full rounded-full bg-black border-0.5 outline-none border-slate-500"></textarea>
            </div>
         </div>
    )
}