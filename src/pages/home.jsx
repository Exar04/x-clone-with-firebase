import { useState, useEffect } from "react"
import { Link, Outlet } from "react-router-dom"
import { Profile } from "./profile"
import { Sidebar } from "./sidebar"
import { PostComponent } from "../components/post"
import { Timeline } from "./timeline"
import { Messages } from "./messages"

export function Home() {
    const [userWantsToPost, setIfUserWantsToPost] = useState(false)

    return (
        <div className="h-screen w-screen flex">
            <Sidebar setIfUserWantsToPost={setIfUserWantsToPost} />
            <div className="h-screen w-full overflow-scroll">{/*homepage*/}
                <Outlet />
            </div>
            {userWantsToPost ? <PostComponent setIfUserWantsToPost={setIfUserWantsToPost} /> : ""}
        </div>
    )
}
