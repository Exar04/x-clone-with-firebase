import { useState } from "react"

export function Messages() {
    const [Posts, setPosts] = useState([
        { id: 1, Username: "Yash", data: "this is my first twitt" },
        { id: 2, Username: "Vinyas", data: "this is my first twitt" },
        { id: 3, Username: "Sajal", data: "this is my first twitt" },
    ])

    const listOfPostsDiv = Posts.map(post =>
        <div key={post.id} className="w-11/12 h-fit border-0.5 text-white p-3 border-slate-400 rounded-lg m-3 flex-none">
            <div className="flex items-center">
                <div className="bg-gray-700 w-12 h-12 rounded-full mr-4"></div>
                <div>{post.Username}</div>
            </div>
            <div className=" w-10/12 relative left-16 flex-wrap flex">{post.data}</div>
        </div>
    )

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
            <div className="bg-zinc-950 h-screen lg:basis-2/6 border-r-0.5 border-0 border-slate-600 text-white justify-center overflow-scroll">
                {listOfUsersDiv}
            </div>
            <div className="bg-zinc-950  h-screen lg:basis-4/6 flex flex-col items-center overflow-scroll">
                {listOfPostsDiv}
            </div>
        </div>

    )
}