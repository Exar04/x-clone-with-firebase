import { useState } from "react"
export function PostComponent(props) {
    const [inputData, setinputData] = useState("")

    function sendPost() {
    }

    return (
        <div className=" w-screen h-screen absolute flex justify-center items-center">
            <div className="bg-zinc-950 w-8/12 h-2/6 z-10 rounded-3xl relative ">
                <input type="text" onChange={(e) => {setinputData(e.target.value)}} className="absolute inset-0 w-full h-full text-white bg-black rounded-3xl text-xl" />
                <div role={"button"} onClick={() => {sendPost()}} className="absolute bottom-2 right-2 p-2 bg-slate-600 rounded-full">
                    <img width="48" height="48"
                        src="https://img.icons8.com/ios-filled/100/FFFFFF/sent.png" alt="sent" />
                </div>
            </div>
            <div onClick={() => { props.setIfUserWantsToPost(false) }} className="bg-white opacity-35 absolute w-full h-full"></div>
        </div>
    )
}