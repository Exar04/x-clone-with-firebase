import React, { useState, useEffect } from "react"
import { ListOfPosts } from "../components/post"
import { usePostHandler } from "../hooks/postHandler"

export function Timeline(props) {
    const { TimelineForYouposts, TimelineFollowingposts } = usePostHandler()
    const [onForYou, setOnForYou] = useState(true)

    return (
        <div className="flex h-full bg-zinc-950">
            <div className="bg-zinc-950  h-full w-full flex flex-col overflow-scroll relative">
                <div role={"button"} className="flex justify-around items-center flex-none h-16 w-full backdrop-blur-lg border-0 border-b-0.5 border-slate-600 sticky top-0 z-10 text-white text-xl">
                    <div onClick={(e) => { setOnForYou(true)}} className=" relative flex-1 flex justify-center items-center h-full"><div className={`absolute bottom-0 ${onForYou? "bg-sky-500" : ""} rounded-full h-1.5 w-3/4 `}></div>For you</div>
                    <div onClick={(e) => { setOnForYou(false)}}className=" relative flex-1 flex justify-center items-center h-full"><div className={`absolute bottom-0 ${onForYou? "": "bg-sky-500" }  rounded-full h-1.5 w-3/4`}></div>Following</div>
                </div>
                { onForYou ?<ListOfPosts listOfPosts={TimelineForYouposts}/>  : <ListOfPosts listOfPosts={TimelineFollowingposts}/> }
            </div>

            <div className=" xl:w-96 w-0 h-0 xl:h-screen overflow-scroll xl:p-3 p-0 xl:border-l-0.5 border-0 border-slate-600 flex-none">
                    <div className=" bg-slate-500 w-full h-96 rounded-lg mb-4"></div>
                    <div className=" bg-slate-400 w-full h-96 rounded-lg mb-4"></div>
                    <div className=" bg-slate-500 w-full h-80 rounded-lg mb-4"></div>
                    <div className=" bg-slate-500 w-full h-40 rounded-lg mb-4"></div>
            </div>
        </div>

    )
}
