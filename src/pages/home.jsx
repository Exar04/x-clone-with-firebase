import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import { Sidebar } from "./sidebar"
import { PostComponent } from "../components/post"

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { BottomNavBarForMobileView, TopNavBarForMobileView } from "../components/navbar"

export function Home() {
    const [userWantsToPost, setIfUserWantsToPost] = useState(false)
    return (
        <div className="flex flex-col w-screen h-dvh">
            <TopNavBarForMobileView />
            <div className="flex-grow w-full flex overflow-scroll">
                <Sidebar setIfUserWantsToPost={setIfUserWantsToPost} />
                <div className="h-full w-full overflow-scroll">
                    <Outlet />
                </div>
                {userWantsToPost ? <PostComponent setIfUserWantsToPost={setIfUserWantsToPost} /> : ""}
            </div>

            <BottomNavBarForMobileView setIfUserWantsToPost={setIfUserWantsToPost} />
        </div>
    )
}