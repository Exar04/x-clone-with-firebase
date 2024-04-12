import { useState, useEffect } from "react"
import { Link, Outlet } from "react-router-dom"
import { Sidebar } from "./sidebar"
import { SendPostComponent } from "../components/sendPost"

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { BottomNavBarForMobileView, TopNavBarForMobileView } from "../components/navbar"
import { useLoggedInUserInfo } from "../hooks/userHandler";

export function Home() {
    const [userWantsToPost, setIfUserWantsToPost] = useState(false)

    const [isPopupNavBarOpen, setIfPopupNavbarOpen] = useState(false)

    return (
        <div className="flex flex-col w-screen h-dvh">
            {/* <TopNavBarForMobileView /> */}
            <div className="flex-grow w-full flex overflow-scroll no-scrollbar">
                <Sidebar setIfUserWantsToPost={setIfUserWantsToPost} />
                <div className="h-full w-full overflow-scroll no-scrollbar">
                    <Outlet context={[setIfPopupNavbarOpen]} />
                </div>
                {userWantsToPost ? <SendPostComponent setIfUserWantsToPost={setIfUserWantsToPost} /> : ""}

                { isPopupNavBarOpen? < PopUpNavBox setIfPopupNavBarOpen={setIfPopupNavbarOpen} />:""}
            </div>

            <BottomNavBarForMobileView setIfUserWantsToPost={setIfUserWantsToPost} userWantsToPost={userWantsToPost}/>
        </div>
    )
}



function PopUpNavBox(props) {
    const { userIdOfLoggedInUser, permanentUsernameOfLoggedInUser } = useLoggedInUserInfo()
    const [newUsername, setNewUsername] = useState("")

    return(
        <div className=" flex justify-center items-center absolute w-screen h-screen top-0 left-0 z-10">
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