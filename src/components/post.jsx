import { useEffect } from "react";
import { useState } from "react";
import { usePostHandler } from "../hooks/postHandler";
import { useLoggedInUserInfo, useUserHandler } from "../hooks/userHandler";

export const ListOfPosts = (props) => {
    const dos = props.listOfPosts.map((post, index) =>
        < SinglePost key={post.id} post={post}/>
        // <div key={post.id} className=" text-white"> wok {index}</div>
    )
    return (<div>{dos}</div>)
}

function SinglePost(props) {
    const { permanentUsernameOfLoggedInUser } = useLoggedInUserInfo()
    const { likeOrDislikePost } = usePostHandler()
    const { getUser_Pfp_from_Username_Displayname } = useUserHandler()

    const [isHoveredOverLike, setIsHoveredOverLike] = useState(false);
    const [isHoveredOverRepost, setIsHoveredOverRepost] = useState(false);
    const [isHoveredOverShare, setIsHoveredOverShare] = useState(false);

    const [postIsAlreadyLiked, setPostIsAlreadyLiked] = useState(false)
    const [postIsAlreadyReposted, setPostIsAlreadyReposted] = useState(false)

    const [pfpImageUrl, setPfpImageUrl] = useState("")

  const handleHoverOverLike = () => {
    setIsHoveredOverLike(!isHoveredOverLike);
  };
  const handleHoverOverRepost = () => {
    setIsHoveredOverRepost(!isHoveredOverRepost)
  };
  const handleHoverOverShare = () => {
    setIsHoveredOverShare(!isHoveredOverShare)
  };

  const handleClickOnLikeButton = () => {
    likeOrDislikePost(props.post.id, permanentUsernameOfLoggedInUser, postIsAlreadyLiked) 
    setPostIsAlreadyLiked(!postIsAlreadyLiked)
  }

  useEffect(() => {
    getUser_Pfp_from_Username_Displayname(props.post.permanentUsername, (pfpUrl) => {
        setPfpImageUrl(pfpUrl)
    })
  }, [])

  useEffect(() => {
    props.post.likes.map((user) => {
        if (user == permanentUsernameOfLoggedInUser) {
            setPostIsAlreadyLiked(true)
        }
    })
  }, [permanentUsernameOfLoggedInUser])

    return(
        <div className="w-full h-fit border-b-0.5 text-white md:p-3 p-2  border-slate-600 flex-none">
            <div className="flex items-center">
                {
                    pfpImageUrl? <img src={pfpImageUrl} className=" md:w-12 md:h-12 w-10 h-10 rounded-full mr-4" /> :
                    <div className="bg-gray-700 md:w-12 md:h-12 w-10 h-10 rounded-full mr-4"></div>
                }

                <div className=" md:text-xl text-lg font-bold">{props.post.permanentUsername}</div>
            </div>
            <div className=" w-10/12 relative md:left-16 left-14 flex-wrap flex md:font-normal font-light">{props.post.data}</div>
            <div className="md:h-8 h-4 w-full mt-2 flex justify-evenly  items-center">
                <div onMouseEnter={handleHoverOverLike} onMouseLeave={handleHoverOverLike} onClick={() => handleClickOnLikeButton() } className={`    rounded-full transition  duration-200 flex justify-center items-center`}>
                    <div className="md:hover:bg-pink-500 hover:blur-lg w-10 h-10 z-10 opacity-40 "/>
                    {
                        postIsAlreadyLiked ? (
                            <img className="md:w-6 md:h-6 h-5 w-5 absolute" src="https://img.icons8.com/ios-glyphs/60/ec4899/like--v1.png" alt="like--v1"/>
                        ): (isHoveredOverLike ?
                        
                            <img  className=" md:w-6 md:h-6 h-5 w-5 absolute " src="https://img.icons8.com/material-outlined/48/ec4899/like--v1.png" alt="like--v1" />
                            : 
                            <img  className=" md:w-6 md:h-6 h-5 w-5 absolute " src="https://img.icons8.com/material-outlined/48/FFFFFF/like--v1.png" alt="like--v1" />
                        )
                    }
                </div>
                <div onMouseEnter={handleHoverOverRepost} onMouseLeave={handleHoverOverRepost} className={`    rounded-full transition  duration-200 flex justify-center items-center `}>
                    <div className="hover:bg-sky-500/50 hover:blur-lg w-10 h-10 z-10 "/>
                    {
                        isHoveredOverRepost ?
                    <img className="md:w-6 md:h-6 h-5 w-5 absolute" src="https://img.icons8.com/material-rounded/48/0ea5e9/retweet.png" alt="retweet" />
                            : 
                    <img className="md:w-6 md:h-6 h-5 w-5 absolute" src="https://img.icons8.com/material-rounded/48/FFFFFF/retweet.png" alt="retweet" />
                    }
                </div>
                <div onMouseEnter={handleHoverOverShare} onMouseLeave={handleHoverOverShare} className={`    rounded-full transition  duration-200 flex justify-center items-center `}>
                    <div className="hover:bg-green-500/50 hover:blur-lg w-10 h-10 z-10 " />
                    {
                        isHoveredOverShare ?
                    <img className="md:w-8 md:h-8 h-6 w-6 absolute" src="https://img.icons8.com/sf-regular/48/22c55e/circled-up.png" alt="circled-up" />
                            : 
                    <img className="md:w-8 md:h-8 h-6 w-6 absolute" src="https://img.icons8.com/sf-regular/48/FFFFFF/circled-up.png" alt="circled-up" />
                    }
                </div>
                <div><img className="md:w-6 md:h-6 h-5 w-5" src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/combo-chart.png" alt="combo-chart" /></div>
            </div>
        </div>
    )
}