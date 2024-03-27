import { doc, updateDoc } from "firebase/firestore"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ListOfPosts } from "../components/post"
import { db } from "../config/firebase"
import { usePostHandler } from "../hooks/postHandler"
import { useLoggedInUserInfo } from "../hooks/userHandler"

export function Timeline(props) {
    const { TimelineForYouposts, TimelineFollowingposts } = usePostHandler()
    const { PfpImageUrlOfLoggedInUser } = useLoggedInUserInfo()

    const [isPopupNavBarOpen, setIfPopupNavbarOpen] = useState(false)
    const [onForYou, setOnForYou] = useState(true)

    return (
        <div className="flex h-full bg-zinc-950">
            <div className="bg-zinc-950  h-full w-full flex flex-col overflow-scroll relative">
                <div role={"button"} className="flex justify-around items-center flex-none h-16 w-full backdrop-blur-lg border-0 border-b-0.5 border-slate-600 sticky top-0 z-10 text-white text-xl">
                    <div onClick={(e) => { setOnForYou(true)}} className=" relative flex-1 flex justify-center items-center h-full"><div className={`absolute bottom-0 ${onForYou? "bg-sky-500" : ""} rounded-full h-1.5 w-3/4 `}></div>For you</div>
                    <div onClick={(e) => { setOnForYou(false)}}className=" relative flex-1 flex justify-center items-center h-full"><div className={`absolute bottom-0 ${onForYou? "": "bg-sky-500" }  rounded-full h-1.5 w-3/4`}></div>Following</div>
                    { PfpImageUrlOfLoggedInUser ? <img onClick={() => { setIfPopupNavbarOpen(true)}} className=" rounded-full w-12 h-12 md:hidden mr-3" src={PfpImageUrlOfLoggedInUser}/>:<div className="rounded-full w-12 h-12 bg-slate-700 md:hidden mr-3"></div> }
                </div>
                { onForYou ?<ListOfPosts listOfPosts={TimelineForYouposts}/>  : <ListOfPosts listOfPosts={TimelineFollowingposts}/> }
                { isPopupNavBarOpen? < PopUpNavBox setIfPopupNavBarOpen={setIfPopupNavbarOpen} />:""}
            </div>

            <div className=" xl:w-96 w-0 h-0 xl:h-screen overflow-scroll xl:p-3 p-0 xl:border-l-0.5 border-0 border-slate-600 flex-none">
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


function PopUpNavBox(props) {
    const { userIdOfLoggedInUser, permanentUsernameOfLoggedInUser } = useLoggedInUserInfo()
    const [newUsername, setNewUsername] = useState("")

    return(
        <div className=" flex justify-center items-center absolute w-screen h-screen top-0 left-0">
            <div className=" z-10 bg-white/5 relative h-auto md:w-auto w-5/6 p-6 flex flex-col justify-center items-center rounded-lg -top-20 ">
                <div className=" absolute top-0 left-0 bg-white/30 -z-10 w-full h-full rounded-xl blur-2xl"></div>
                <div className=" bg-black w-full h-full p-6 rounded-lg ">
                    <Link to={`/home/profile/${permanentUsernameOfLoggedInUser}`}><div role={"button"} className=" p-3 text-2xl rounded-xl text-center ring-white ring-1 bg-black text-white text-wrap hover:bg-white hover:text-black transition duration-300">Profile</div></Link>
                    <Link to={"/home/editprofile"}><div role={"button"} className=" my-6 p-3 text-2xl rounded-xl text-center ring-white ring-1 bg-black text-white text-wrap hover:bg-white hover:text-black transition duration-300">Edit Profile</div></Link>
                    <Link to={"/home/draft"}><div role={"button"} className=" p-3 text-2xl rounded-xl text-center ring-white ring-1 bg-black text-white text-wrap hover:bg-white hover:text-black transition duration-300">Drafts</div></Link>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div onClick={() => {props.setIfPopupNavBarOpen(false)}} className=" absolute w-screen h-screen backdrop-blur-sm top-0 left-0"></div>
        </div>
    )
}
