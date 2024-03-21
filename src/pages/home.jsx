import { useState, useEffect } from "react"
import { Link, Outlet } from "react-router-dom"
import { Profile } from "./profile"
import { Sidebar } from "./sidebar"
import { PostComponent } from "../components/post"
import { Timeline } from "./timeline"
import { Messages } from "./messages"

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { BottomNavBarForMobileView, TopNavBarForMobileView } from "../components/navbar"

export function Home() {
    const [userWantsToPost, setIfUserWantsToPost] = useState(false)
    return (
        <div className="flex flex-col w-screen h-screen">
            <TopNavBarForMobileView />
            <div className="flex-grow w-full flex">
                <Sidebar setIfUserWantsToPost={setIfUserWantsToPost} />
                <div className="h-full w-full overflow-scroll">
                    <Outlet />
                </div>
                {userWantsToPost ? <PostComponent setIfUserWantsToPost={setIfUserWantsToPost} /> : ""}
            </div>

            <BottomNavBarForMobileView />
        </div>
    )
}
