import { useEffect } from "react";
import { useState } from "react"
import { usePostHandler } from "../hooks/postHandler"
import { useLoggedInUserInfo } from "../hooks/userHandler";

export function SendPostComponent(props) {
    const [inputData, setinputData] = useState("")
    const { PfpImageUrlOfLoggedInUser } = useLoggedInUserInfo()
    const { sendPost } = usePostHandler()

    return (
        <div className=" w-screen h-full absolute top-0 flex justify-center z-30">
            <div className="md:w-3/6 w-full md:h-96 h-72 md:m-0 m-2 z-10 relative md:-left-6 md:top-32 top-1">

                {/* Animation div */}
                <div className={` absolute w-full h-full -z-10  rounded-3xl -bottom-1 -left-1 `} style={{ width: '102%', height: '102%' }}>
                    <div className=" bg-gradient-to-r from-sky-300 to-sky-700 w-full h-full  rounded-3xl blur-xl" /*style={{animation: " spin 5s linear infinite"}} */></div>
                    {/* <div className=" bg-gradient-to-r from-sky-300 to-black absolute rounded-3xl blur-xl animate-spin" style={{animation: "spin 4s linear infinite", width:'150%', height:'250%', right:'-30%', top:'-40%'}}></div> */}
                </div>

                <div className=" bg-zinc-950 flex flex-col w-full h-full rounded-3xl border-0.5 border-slate-500">

                <div className=" w-full h-14 flex justify-between items-center">
                    <img className="md:ml-4 md:mt-2 ml-3 md:w-12 md:h-12 w-10 h-10 hover:bg-zinc-800 rounded-full transition duration-300" src="https://img.icons8.com/ios/100/FFFFFF/multiply.png" alt="multiply" />
                        <div className=" text-sky-500 font-bold mr-4 rounded-full hover:bg-zinc-800 p-2 md:text-lg ">Drafts</div>
                    </div>
                    <div className=" flex w-full flex-grow">
                        <div className=" h-full w-18 px-2">
                            {PfpImageUrlOfLoggedInUser ? <img src={PfpImageUrlOfLoggedInUser} className=" md:w-16 md:h-16 w-12 h-12 rounded-full" /> :
                                <div className="bg-gray-700 w-16 h-16 rounded-full"></div> // {/* profile pic area */}
                            }
                        </div>
                        <div className=" flex-grow md:pr-7 md:pt-5 pt-3 ">
                            <textarea name="" id="" onChange={(e) => { setinputData(e.target.value) }} className=" h-full w-full bg-zinc-950 text-white md:text-2xl outline-none"></textarea>
                        </div>
                    </div>
                    <div className=" flex justify-between items-center p-2">
                        <div className="flex">
                            <div className=" rounded-full hover:bg-zinc-800 p-3"><img className=" md:w-8 md:h-8 w-6 h-6"  src="https://img.icons8.com/material-rounded/48/0ea5e9/image.png" alt="image"/></div>
                            <div className=" rounded-full hover:bg-zinc-800 p-3"><img className=" md:w-8 md:h-8 w-6 h-6" src="https://img.icons8.com/fluency-systems-filled/96/0ea5e9/gif.png" alt="gif"/></div>
                        </div>
                        <div role={"button"} onClick={() => { sendPost(inputData); props.setIfUserWantsToPost(false) }} className="p-2 px-6 bg-sky-400 rounded-3xl">Post</div>
                    </div>


                </div>


            </div>
            <div onClick={() => { props.setIfUserWantsToPost(false) }} className=" backdrop-blur-sm  absolute w-full h-screen"></div>
        </div>

        // <div className=" bg-lime-500 w-full h-full fixed top-0"></div>
    )
}