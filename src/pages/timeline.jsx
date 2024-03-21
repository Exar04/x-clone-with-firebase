import React, { useState, useEffect } from "react"
import { usePostHandler } from "../hooks/postHandler"

export function Timeline(props) {
    const { TimelineForYouposts } = usePostHandler()

    const listOfPostsDiv = TimelineForYouposts.map(post =>
        <div key={post.id} className="w-full h-fit  border-b-0.5 text-white p-3 border-slate-600 flex-none">
            <div className="flex items-center">
                <div className="bg-gray-700 w-12 h-12 rounded-full mr-4"></div>
                <div className=" text-xl font-bold">{post.permanentUsername}</div>
            </div>
            <div className=" w-10/12 relative left-16 flex-wrap flex text-lg">{post.data}</div>
        </div>
    )

    return (
        <div className="flex h-full bg-zinc-950">
            <div className="bg-zinc-950  h-full w-full flex flex-col overflow-scroll relative">
                <div className="flex justify-around items-center flex-none h-20 w-full backdrop-blur-lg border-0 border-b-0.5 border-slate-600 sticky top-0 z-10 text-white text-xl">
                    <div className=" relative"><div className="absolute top-11 bg-sky-500 rounded-full h-1.5 w-full"></div>For you</div>
                    <div>Following</div>
                </div>
                {listOfPostsDiv}
            </div>

            <div className=" lg:w-96 w-0 h-0 lg:h-screen  overflow-scroll p-3 border-l-0.5 border-0 border-slate-600">
                    <div className=" bg-slate-500 w-full h-96 rounded-lg mb-4"></div>
                    <div className=" bg-slate-400 w-full h-96 rounded-lg mb-4"></div>
                    <div className=" bg-slate-500 w-full h-80 rounded-lg mb-4"></div>
                    <div className=" bg-slate-500 w-full h-40 rounded-lg mb-4"></div>
            </div>

            {/* <div className="bg-zinc-950 md:basis-2/6 w-0 lg:h-screen border-l-0.5 border-0 border-slate-600 overflow-scroll">
                <div className=" m-4 h-full">
                    <div className=" bg-slate-500 w-full h-96 rounded-lg mb-4"></div>
                    <div className=" bg-slate-400 w-full h-96 rounded-lg mb-4"></div>
                    <div className=" bg-slate-500 w-full h-80 rounded-lg mb-4"></div>
                    <div className=" bg-slate-500 w-full h-40 rounded-lg mb-4"></div>
                </div>
            </div> */}
        </div>

    )
}
