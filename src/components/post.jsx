import { useEffect } from "react";
import { useState } from "react";
import { usePostHandler } from "../hooks/postHandler";
import { useLoggedInUserInfo, useUserHandler } from "../hooks/userHandler";

export const ListOfPosts = (props) => {
    const dos = props.listOfPosts.map(post =>
        < SinglePost post={post}/>
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
        <div key={props.post.id} className="w-full h-fit border-b-0.5 text-white p-3 border-slate-600 flex-none">
            <div className="flex items-center">
                {
                    pfpImageUrl? <img src={pfpImageUrl} className=" w-12 h-12 rounded-full mr-4" /> :
                    <div className="bg-gray-700 w-12 h-12 rounded-full mr-4"></div>
                }

                <div className=" text-xl font-bold">{props.post.permanentUsername}</div>
            </div>
            <div className=" w-10/12 relative left-16 flex-wrap flex text-lg">{props.post.data}</div>
            <div className="h-8 w-full mt-2 flex justify-evenly items-center">
                <div onMouseEnter={handleHoverOverLike} onMouseLeave={handleHoverOverLike} onClick={() => handleClickOnLikeButton() } className={`    rounded-full transition  duration-200 flex justify-center items-center`}>
                    <div className="md:hover:bg-pink-500 hover:blur-lg w-10 h-10 z-10 opacity-40 "/>
                    {
                        postIsAlreadyLiked ? (
                            <img width="25" height="25" className=" absolute" src="https://img.icons8.com/ios-glyphs/60/ec4899/like--v1.png" alt="like--v1"/>
                        ): (isHoveredOverLike ?
                        
                            <img width="25" height="25" className=" absolute " src="https://img.icons8.com/material-outlined/48/ec4899/like--v1.png" alt="like--v1" />
                            : 
                            <img width="25" height="25" className=" absolute " src="https://img.icons8.com/material-outlined/48/FFFFFF/like--v1.png" alt="like--v1" />
                        )
                    }
                </div>
                <div onMouseEnter={handleHoverOverRepost} onMouseLeave={handleHoverOverRepost} className={`    rounded-full transition  duration-200 flex justify-center items-center `}>
                    <div className="hover:bg-sky-500/50 hover:blur-lg w-10 h-10 z-10 "/>
                    {
                        isHoveredOverRepost ?
                    <img width="25" height="25" className=" absolute" src="https://img.icons8.com/material-rounded/48/0ea5e9/retweet.png" alt="retweet" />
                            : 
                    <img width="25" height="25" className=" absolute" src="https://img.icons8.com/material-rounded/48/FFFFFF/retweet.png" alt="retweet" />
                    }
                </div>
                <div onMouseEnter={handleHoverOverShare} onMouseLeave={handleHoverOverShare} className={`    rounded-full transition  duration-200 flex justify-center items-center `}>
                    <div className="hover:bg-green-500/50 hover:blur-lg w-10 h-10 z-10 " />
                    {
                        isHoveredOverShare ?
                    <img width="30" height="30" className=" absolute" src="https://img.icons8.com/sf-regular/48/22c55e/circled-up.png" alt="circled-up" />
                            : 
                    <img width="30" height="30" className=" absolute" src="https://img.icons8.com/sf-regular/48/FFFFFF/circled-up.png" alt="circled-up" />
                    }
                </div>
                <div><img width="23" height="23" src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/combo-chart.png" alt="combo-chart" /></div>
            </div>
        </div>
    )
}