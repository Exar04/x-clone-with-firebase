import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { ListOfPosts } from "../components/post"
import { usePostHandler } from "../hooks/postHandler"
import { useUserHandler, useLoggedInUserInfo } from "../hooks/userHandler"

export function Profile(props) {
    const params = useParams()

    const [isProfileOfLoggedInUser, set_If_It_Is_ProfileOfLoggedInUser] = useState(false)
    const { permanentUsernameOfLoggedInUser, userIdOfLoggedInUser, listOfFollowingsOfLoggedInUser, listOfFollowersOfLoggedInUser } = useLoggedInUserInfo()
    const { getUser_Pfp_from_Username_Displayname, getUser_background_image_from_Username, getUser_display_name_from_permanent_username } = useUserHandler()
    const usernameInUrl = params.permanentUsername

    const [ pfpImageUrl, setPfpImageUrl] = useState("")
    const [ BackgroundImageUrl, setBackgroundImageUrl] = useState("")
    const [permanentUsernameOfUserWeSearchedFor,setPermanentUsernameOfUserWeSearchedFor ] = useState("")
    const [bioOfUserWeSearchedFor, setBioOfUserWeSearchedFor] = useState("")
    const [displayNameOfUserWeSearchedFor, setDisplayNameOfUserWeSearchedFor] = useState("") 
    const [professionOfUserWeSearchedFor, setProfessionOfUserWeSearchedFor] = useState("")
    const [userIdOfUserWeSearchedFor, setUserIdOfUserWeSearchedFor] = useState("")
    const [listOfPosts, setListOfPosts] = useState([])
    const [ loggedin_user_follows_this_user ,set_loggedin_user_follows_this_user] = useState(false)
    const [ user_follows_loggedin_user, set_user_follows_loggedin_user  ] = useState(false)
    const [FollowButtonText, setFollowButtonText] = useState("")

    const { getUserProfileData, followOrUnFollowThisUser } = useUserHandler()
    const { LoggedInUserPosts, getUserPosts } = usePostHandler()

    function clickedFollowButton() {
        followOrUnFollowThisUser(userIdOfLoggedInUser, userIdOfUserWeSearchedFor, permanentUsernameOfLoggedInUser, permanentUsernameOfUserWeSearchedFor, loggedin_user_follows_this_user)
        set_loggedin_user_follows_this_user(!loggedin_user_follows_this_user)
    }

    // useEffect(() => {
    //   }, [permanentUsernameOfUserWeSearchedFor, usernameInUrl ])

    useEffect(() => {
        if (permanentUsernameOfLoggedInUser == usernameInUrl) {
            set_If_It_Is_ProfileOfLoggedInUser(true)
        }
        getUserProfileData(usernameInUrl, (userData) => {
            setPermanentUsernameOfUserWeSearchedFor(userData.permanentUsername)
            setProfessionOfUserWeSearchedFor(userData.profession)
            setDisplayNameOfUserWeSearchedFor(userData.username)
            setUserIdOfUserWeSearchedFor(userData.id)
            setBioOfUserWeSearchedFor(userData.bio)
        })

        getUser_Pfp_from_Username_Displayname(usernameInUrl, (pfpUrl) => {
            setPfpImageUrl(pfpUrl)
        })

        getUser_background_image_from_Username(usernameInUrl, (pfpUrlo) => {
            setBackgroundImageUrl(pfpUrlo)
        })

        getUserPosts(usernameInUrl, (posts) => {
            setListOfPosts([...posts])
        })
        set_user_follows_loggedin_user( listOfFollowersOfLoggedInUser.includes(permanentUsernameOfUserWeSearchedFor))
        set_loggedin_user_follows_this_user( listOfFollowingsOfLoggedInUser.includes(permanentUsernameOfUserWeSearchedFor))
    }, [ permanentUsernameOfLoggedInUser, usernameInUrl, permanentUsernameOfUserWeSearchedFor])

    useEffect(() => {
        if (user_follows_loggedin_user == true && loggedin_user_follows_this_user == true) {
            setFollowButtonText("Following")
        } else if (user_follows_loggedin_user == false && loggedin_user_follows_this_user == true){
            setFollowButtonText("Following")
        } else if (user_follows_loggedin_user == true && loggedin_user_follows_this_user == false){
            setFollowButtonText("Follows You")
        } else if (user_follows_loggedin_user == false && loggedin_user_follows_this_user == false){
            setFollowButtonText("Follow")
        }

    }, [user_follows_loggedin_user, loggedin_user_follows_this_user]) 

    return (
        <div className="flex lg:flex-row flex-col">
            <div className="bg-zinc-950  h-screen lg:basis-4/6 flex flex-col items-center overflow-scroll no-scrollbar relative">
                <div className="flex items-center md:h-20 h-16 w-full backdrop-blur-lg border-0 border-b-0.5 bg-black/70 border-slate-600 p-1 sticky top-0 z-10">
                    <img className=" md:w-8 md:h-8 w-6 h-6 ml-6" src="https://img.icons8.com/ios-filled/100/FFFFFF/back.png" alt="back" />
                    <div className="m-4">
                        <div className=" text-white font-bold text-2xl ml-6">{ displayNameOfUserWeSearchedFor? displayNameOfUserWeSearchedFor : permanentUsernameOfUserWeSearchedFor }</div>
                        <div className=" text-slate-500 text-sm ml-6">Number of post</div>
                    </div>
                </div>
                <div className=" w-full relative h-screen">
{/* banner */} 
                    { BackgroundImageUrl ?
                    <img className="w-full md:h-72 h-48" src={BackgroundImageUrl} style={{ objectFit: 'cover'}}/>
                    :
                    <div className=" bg-slate-700 w-full h-72"></div> 
                    }
{/* Pfp */}
                    {pfpImageUrl ?
                    <img className=" bg-slate-600 rounded-full md:w-48 md:h-48 w-28 h-28 absolute md:top-48 md:left-12 left-6 top-32  overflow-hidden" src={pfpImageUrl} style={{ objectFit: 'cover'}}/>
                    :
                    <div className=" bg-slate-600 rounded-full w-48 h-48 absolute top-48 left-16 "></div> 
                    }
                    <div className=" h-80">
                        <div className=" md:h-28 h-10"></div> {/* just white space between pfp n content */}
                        <div className="m-3 mb-2 flex  items-baseline ">
                            <div className=" ml-6 text-2xl font-bold text-white">{displayNameOfUserWeSearchedFor}</div>
                            <div className=" ml-6 text-xl  text-slate-600">@{permanentUsernameOfUserWeSearchedFor}</div>
                        </div>
                            { isProfileOfLoggedInUser ? null :
                            <div role={"button"} onClick={(e) => { clickedFollowButton() }} className={`${ (FollowButtonText === "Following")?"text-white ring-2 ring-pink-500 bg-black":"bg-white" } ml-9 mb-3 px-4 py-1 w-fit rounded-lg hover:bg-black hover:text-white hover:ring-2 hover:ring-pink-500 ring-inset transition duration-300 ease-in-out`}>
                                {FollowButtonText}
                            </div>
                            }
                        <div className=" ml-9 mb-3 mr-3 text-xl  text-white">{bioOfUserWeSearchedFor}</div>
                        <div className="lg:flex ml-9 text-xl">
                            <div className="flex text-slate-600 items-center mr-5"> <img width="25" height="25" className=" relative bottom-1 mr-2" src="https://img.icons8.com/pastel-glyph/64/404040/suitcase--v3.png" alt="suitcase--v3"/> {professionOfUserWeSearchedFor? professionOfUserWeSearchedFor: "No work"}</div>
                            <div className="flex text-slate-600 items-center mr-5"><img width="25" height="20" className=" relative bottom-0.5 mr-1" src="https://img.icons8.com/material-rounded/48/404040/cupcake.png" alt="cupcake"/> <div> Birth date</div></div>
                            <div className="flex text-slate-600 items-center"><img width="20" height="20" className=" relative bottom-0.5 mr-1" src="https://img.icons8.com/external-sbts2018-solid-sbts2018/58/404040/external-calender-diwali-sbts2018-solid-sbts2018-2.png" alt="external-calender-diwali-sbts2018-solid-sbts2018-2"/><div>Joined At</div></div>
                        </div>
                        <div className="flex ml-9 text-xl m-4">
                            <div className=" mr-5 flex"><div className="text-white mr-2">69</div> <div className=" text-slate-600 ">Followers</div></div>
                            <div className=" mr-5 flex"><div className="text-white mr-2">69</div> <div className=" text-slate-600 ">Following</div></div>
                        </div>
                    </div>

                    <div className="w-full md:h-16 h-14 flex justify-around text-2xl items-center text-white border-0 border-b-0.5 border-slate-500">
                        <div className=" font-thin text-xl  md:font-normal relative"><div className="absolute top-10 bg-sky-400 rounded-full md:h-2 h-1 w-full "></div>Posts</div>
                        <div className=" font-thin text-xl  md:font-normal relative">Replies</div>
                        <div className=" font-thin text-xl  md:font-normal relative">Media</div>
                        <div className=" font-thin text-xl  md:font-normal relative">Liked</div>
                    </div>
                    <ListOfPosts listOfPosts={listOfPosts}/>
                </div>
            </div>
            <div className="bg-zinc-950 lg:h-screen lg:basis-2/6 w-0 h-0 border-l-0.5 border-0 border-slate-600 text-white overflow-scroll no-scrollbar">
                <div className=" m-4">
                        <div className=" bg-zinc-900 w-full h-96 ring-1 ring-slate-700 rounded-lg mb-4"></div>
                        <div className=" bg-zinc-900 w-full h-96 ring-1 ring-slate-700 rounded-lg mb-4"></div>
                        <div className=" bg-zinc-900 w-full h-96 ring-1 ring-slate-700 rounded-lg mb-4"></div>
                </div>
            </div>
        </div>

    )
}