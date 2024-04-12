import { doc, updateDoc } from "firebase/firestore"
import React, { useState, useEffect } from "react"
import { Link, useOutletContext } from "react-router-dom"
import { ListOfPosts } from "../components/post"
import { db } from "../config/firebase"
import { usePostHandler } from "../hooks/postHandler"
import { useLoggedInUserInfo } from "../hooks/userHandler"

export function Timeline(props) {
    const { TimelineForYouposts, TimelineFollowingposts } = usePostHandler()
    const { PfpImageUrlOfLoggedInUser } = useLoggedInUserInfo()

    const [ setIfPopupNavBarOpen ] = useOutletContext()

    const [onForYou, setOnForYou] = useState(true)

    return (
        <div className="flex h-full bg-zinc-950">
            <div className="bg-zinc-950  h-full w-full flex flex-col overflow-scroll no-scrollbar relative">
                <div role={"button"} className="flex justify-around items-center flex-none md:h-16 h-14 w-full backdrop-blur-lg border-0 border-b-0.5 border-slate-600 sticky top-0 z-10 text-white text-xl">
                    <div onClick={(e) => { setOnForYou(true)}} className=" relative flex-1 flex justify-center items-center h-full md:font-normal font-thin"><div className={`absolute bottom-0 ${onForYou? "bg-sky-500" : ""} rounded-full md:h-1.5 md:w-3/4 h-1 w-2/4`}></div>For you</div>
                    <div onClick={(e) => { setOnForYou(false)}}className=" relative flex-1 flex justify-center items-center h-full md:font-normal font-thin"><div className={`absolute bottom-0 ${onForYou? "": "bg-sky-500" }  rounded-full md:h-1.5 md:w-3/4 h-1 w-2/4`}></div>Following</div>
                    { PfpImageUrlOfLoggedInUser ? <img onClick={() => { setIfPopupNavBarOpen(true)}} className=" rounded-full w-12 h-12 md:hidden mr-3" src={PfpImageUrlOfLoggedInUser}/>:<div className="rounded-full w-12 h-12 bg-slate-700 md:hidden mr-3"></div> }
                </div>
                { onForYou ?<ListOfPosts listOfPosts={TimelineForYouposts}/>  : <ListOfPosts listOfPosts={TimelineFollowingposts}/> }
            </div>

            <div className=" xl:w-96 w-0 h-0 xl:h-screen overflow-scroll no-scrollbar xl:p-3 p-0 xl:border-l-0.5 border-0 border-slate-600 flex-none">
                    {/* <div className=" relative w-full h-96 rounded-lg mb-4">
                        <div className=" bg-white/30 absolute top-0 left-0 w-full h-full blur-lg"></div>
                        <div className=" bg-zinc-900 absolute top-0 left-0 w-full h-full rounded-lg "></div>
                    </div> */}
                    <div className=" bg-zinc-900 w-full h-96  rounded-lg mb-4"></div>
                    <div className=" bg-zinc-900 w-full h-96  rounded-lg mb-4"></div>
                    <div className=" bg-zinc-900 w-full h-96  rounded-lg mb-4"></div>
            </div>
        </div>

    )
}