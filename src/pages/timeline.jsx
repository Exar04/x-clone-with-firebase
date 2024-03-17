import { useState } from "react"

export function Timeline(props) {
    const [Posts, setPosts] = useState([
        { id: 1, Username: "Yash", data: "this is my first twitt" },
        { id: 2, Username: "Vinyas", data: "this is my first twitt" },
        { id: 3, Username: "Sajal", data: "this is my first twitt" },
    ])

    const listOfPostsDiv = Posts.map(post =>
        <div key={post.id} className="w-11/12 h-fit border-0.5 text-white p-3 border-slate-600 rounded-lg m-3 flex-none">
            <div className="flex items-center">
                <div className="bg-gray-700 w-12 h-12 rounded-full mr-4"></div>
                <div>{post.Username}</div>
            </div>
            <div className=" w-10/12 relative left-16 flex-wrap flex">{post.data}</div>
        </div>
    )

    return (
        <div className="flex lg:flex-row flex-col ">
            <div className="bg-zinc-950  h-screen lg:basis-4/6 flex flex-col items-center overflow-scroll relative">
                <div className="flex justify-around items-center flex-none h-20 w-full backdrop-blur-lg border-0 border-b-0.5 border-slate-600 sticky top-0 z-10 text-white text-xl">
                    <div className=" relative"><div className="absolute top-11 bg-blue-500 rounded-full h-1.5 w-full"></div>For you</div>
                    <div>Following</div>
                </div>
                {listOfPostsDiv}
                {listOfPostsDiv}
                {listOfPostsDiv}
                {listOfPostsDiv}
                {listOfPostsDiv}
                {listOfPostsDiv}
                {listOfPostsDiv}
                {listOfPostsDiv}
                {listOfPostsDiv}
                {listOfPostsDiv}
                {listOfPostsDiv}
                {listOfPostsDiv}
                {listOfPostsDiv}
            </div>
            <div className="bg-zinc-950 h-screen lg:basis-2/6 border-l-0.5 border-0 border-slate-600 overflow-scroll">
                {/* <input type="text" className="bg-zinc-950 border m-3 p-3 w-5/6 h-12 "/> */}
                {/* <div className="text-white">heh this is inside of timeline component</div> */}
                <div className=" m-4">
                    <div className=" bg-slate-500 w-full h-96 rounded-lg mb-4"></div>
                    <div className=" bg-slate-400 w-full h-96 rounded-lg mb-4"></div>
                    <div className=" bg-slate-500 w-full h-80 rounded-lg mb-4"></div>
                    <div className=" bg-slate-500 w-full h-40 rounded-lg mb-4"></div>
                </div>
            </div>
        </div>

    )
}
