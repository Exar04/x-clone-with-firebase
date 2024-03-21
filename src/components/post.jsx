import { useState } from "react"
import { usePostHandler } from "../hooks/postHandler"

export function PostComponent(props) {
    const [inputData, setinputData] = useState("")
    const { sendPost } = usePostHandler()

    return (
        <div className=" w-screen h-screen absolute flex justify-center ">
            <div className="bg-zinc-950 md:w-3/6 w-full h-96 z-10 rounded-3xl relative md:-left-6 top-32 flex flex-col">
                <div className=" w-full h-14 flex justify-between items-center">
                    <img width="50" height="50" className="ml-4 mt-2 hover:bg-zinc-800 rounded-full transition duration-300" src="https://img.icons8.com/ios/100/FFFFFF/multiply.png" alt="multiply" />
                    <div className=" text-sky-500 font-bold mr-4 rounded-full hover:bg-zinc-800 p-2 text-lg ">Drafts</div>
                </div>
                <div className=" flex w-full flex-grow">
                    <div className=" h-full w-18 px-2"><div className="bg-gray-700 w-16 h-16 rounded-full"></div></div> {/* profile pic area */}
                    <div className=" flex-grow pr-7 pt-5 ">
                        <textarea name="" id="" onChange={(e) => { setinputData(e.target.value)}} className=" h-full w-full bg-zinc-950 text-white text-2xl outline-none"></textarea>
                    </div>
                </div>
                    <div className=" flex justify-between items-center p-2">
                        <div className="flex">
                            <div className=" rounded-full hover:bg-zinc-800 p-3"><img width="30" height="30"  src="https://img.icons8.com/material-rounded/48/0ea5e9/image.png" alt="image"/></div>
                            <div className=" rounded-full hover:bg-zinc-800 p-3"><img width="30" height="30" src="https://img.icons8.com/fluency-systems-filled/96/0ea5e9/gif.png" alt="gif"/></div>
                        </div>
                        <div role={"button"} onClick={() => { sendPost(inputData); props.setIfUserWantsToPost(false) }} className="p-2 px-6 bg-sky-400 rounded-3xl">Post</div>
                    </div>
            </div>
            <div onClick={() => { props.setIfUserWantsToPost(false) }} className="bg-sky-200 opacity-20 absolute w-full h-full"></div>
        </div>
    )
}