import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useLoggedInUserInfo } from "../hooks/userHandler"

export function BottomNavBarForMobileView(props) {
    const { permanentUsernameOfLoggedInUser } = useLoggedInUserInfo()
    const [navBarLinks, setNavBarLinks] = useState([
        { id: 1, pagevar: "Timeline", link: "/home/timeline", icon: "https://img.icons8.com/material-sharp/96/FFFFFF/home.png" },
        { id: 2, pagevar: "Explore", link: "home/explore", icon: "https://img.icons8.com/ios-glyphs/90/FFFFFF/search--v1.png" },
        { id: 3, pagevar: "Messages", link: "home/messages", icon: "https://img.icons8.com/ios-glyphs/90/FFFFFF/messaging-.png" },
        { id: 4, pagevar: "Notification", link: "home/notification", icon: "https://img.icons8.com/fluency-systems-filled/96/FFFFFF/appointment-reminders.png" },
        // { id: 5, pagevar: "ExtraHiddenOne", link: "", icon: "" }
        // { id: 5, pagevar: "Drafts", link: "home/draft", icon: "https://img.icons8.com/pastel-glyph/64/FFFFFF/edit-file--v1.png" }
    ])

    const listOfNavi = navBarLinks.map(data => (
        <div key={data.id} className=" w-9 h-9 md:hidden">
            <Link to={data.link}>
                <img src={data.icon}/> 
            </Link>

        </div>
    )) 

    return (
        <div className="md:h-0 h-16 flex-none w-screen bg-zinc-950 border-t-0.5 border-slate-600 ">
            <div className=" flex h-full justify-around items-center">
                {listOfNavi}
                <div onClick={() => { props.setIfUserWantsToPost(true) }} className=" rounded-full w-12 h-12 md:w-0 md:h-0 bg-sk500 flex justify-center items-center">
                    { props.userWantsToPost?<img width="50" height="50" className=" z-30" src="https://img.icons8.com/glyph-neue/64/0ea5e9/quill-pen.png" alt="quill-pen" />:
                        <img width="40" height="40" src="https://img.icons8.com/glyph-neue/64/FFFFFF/quill-pen.png" alt="quill-pen" />
                    }
                </div>
            </div>
            {/* <div onClick={() => { props.setIfUserWantsToPost(true) }} className=" absolute right-5 bottom-6 rounded-full w-20 h-20 md:w-0 md:h-0 bg-sky-500 flex justify-center items-center">
            <img width="48" height="48" src="https://img.icons8.com/android/48/FFFFFF/plus.png" alt="plus"/>
            </div> */}
        </div>
    )
}

export function TopNavBarForMobileView() {
    const { PfpImageUrlOfLoggedInUser } = useLoggedInUserInfo()
    const [currentUrl, setCurrentUrl] = useState("")
    const regexUrl = /\/home\/profile\//
    useEffect(() => {
      setCurrentUrl(window.location.href)

      console.log(currentUrl)
      console.log(currentUrl.match(regexUrl))
    }, [])
    
    return (
        <div>

        { currentUrl.match(regexUrl) ? <div></div>: 
        <div className=" md:h-0 h-16 flex-none flex justify-between items-center px-4 w-screen bg-zinc-950 border-b-0.5 border-slate-600">
            {/* <div className=" w-5 h-5 bg-blue-500"></div> */}
            <img className=" w-10 h-10" width="50" height="50" src="https://img.icons8.com/ios-filled/100/FFFFFF/share-2.png" alt="share-2" />
            { PfpImageUrlOfLoggedInUser ? <img className=" rounded-full w-12 h-12" src={PfpImageUrlOfLoggedInUser}/>:<div className="rounded-full w-12 h-12 bg-slate-700"></div> }
        </div>
        }
        </div>
    )
}