import { useEffect, useState } from "react"
import { Link, Outlet } from "react-router-dom"
import { useAuth } from "../context/authContext"
import { useLoggedInUserInfo } from "../hooks/userHandler"


export function Sidebar(props) {
    const [clicledOnLoggedInUser, setClicledOnLoggedInUser] = useState(false)
    const { permanentUsernameOfLoggedInUser, PfpImageUrlOfLoggedInUser } = useLoggedInUserInfo(false)
    const { logOut } = useAuth()

    const [SidebarPages, setSidebarPages] = useState([])
    useEffect(() => {
        if (permanentUsernameOfLoggedInUser) {
        setSidebarPages(
            [
                { id: 1, pagevar: "Timeline", link: "/home/timeline", icon: "https://img.icons8.com/material-sharp/96/FFFFFF/home.png" },
                { id: 2, pagevar: "Explore", link: "home/explore", icon: "https://img.icons8.com/ios-glyphs/90/FFFFFF/search--v1.png" },
                { id: 3, pagevar: "Messages", link: "home/messages/0", icon: "https://img.icons8.com/ios-glyphs/90/FFFFFF/messaging-.png" },
                { id: 4, pagevar: "Notification", link: "home/notification", icon: "https://img.icons8.com/fluency-systems-filled/96/FFFFFF/appointment-reminders.png" },
                { id: 5, pagevar: "Drafts", link: "home/draft", icon: "https://img.icons8.com/pastel-glyph/64/FFFFFF/edit-file--v1.png" },
                { id: 6, pagevar: "Profile", link: `home/profile/${permanentUsernameOfLoggedInUser}`, icon: "https://img.icons8.com/material-rounded/96/FFFFFF/user.png" }
            ])}

    }, [permanentUsernameOfLoggedInUser])

    const listOfSidebarPagesDiv = SidebarPages.map(Page =>
        <div key={Page.id}>
        <Link to={Page.link}><div key={Page.id} className="p-3 m-2 text-2xl font-mono text-white hover:bg-zinc-700 rounded-lg text-center flex justify-start">
            <img src={Page.icon} width="35" height="20" className=" relative bottom-1 mr-10" alt="" />
            <div> {Page.pagevar}</div>
        </div></Link>
        </div>
    )

    const logOutAndEditProfileComponent = (
        clicledOnLoggedInUser ?
            <div>
                <Link to={"/home/editprofile"}><div className="p-3 ml-9 m-2 text-2xl text-white bg-sky-500 hover:bg-sky-400 rounded-full text-center transition duration-500 hover:translate-x-2">Edit Profile</div></Link>
                <div onClick={logOut} className="p-3 ml-9 m-2 text-2xl text-white bg-sky-500 hover:bg-red-500 rounded-full text-center transition duration-500 hover:translate-x-2">Log Out</div>
            </div>
            : <></>
    )
    return (
        <div className="md:w-96 w-0 flex-none bg-zinc-950 md:h-screen flex flex-col md:border-r-0.5 border-0 border-slate-600">{/*SideBar*/}
            
            <div className=" text-3xl text-white font-bold font-mono ml-10 m-4 flex-none flex items-center"> <img width="80" height="80" src="CsphereLogo.png" alt="share-2" />ConnectSphere</div>
            <div className=" flex-grow overflow-scroll no-scrollbar ml-7">
                {listOfSidebarPagesDiv}
                <div onClick={() => { props.setIfUserWantsToPost(true) }} className="p-3 m-2 text-2xl text-white hover:bg-sky-400 bg-sky-500 rounded-full text-center">Post</div>
            </div>
            {logOutAndEditProfileComponent}
            <div role={"button"} onClick={() => { setClicledOnLoggedInUser(!clicledOnLoggedInUser) }} className="h-24 flex-none text-xl text-white flex items-center p-4 m-4 justify-between">
                <div>{permanentUsernameOfLoggedInUser}</div>
                { PfpImageUrlOfLoggedInUser? <img src={PfpImageUrlOfLoggedInUser} className=" w-12 h-12 rounded-full"/>:
                    <div className="bg-gray-700 w-12 h-12 rounded-full"></div>
                }
            </div>
        </div>

    )
}

