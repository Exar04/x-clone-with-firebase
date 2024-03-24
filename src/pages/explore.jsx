import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useUserHandler } from "../hooks/userHandler"

export function Explore() {

    const [inputData, setInputData] = useState([])
    const inputRef = useRef()

    function ResetInputData() {
        setInputData("")
        inputRef.current.value = ""
    }
    return (
        <div className="flex h-full bg-zinc-950">
            <div className="bg-zinc-950  h-full w-full flex flex-col overflow-scroll relative">
                <div className=" w-full h-16 bg-zinc-950 p-1 flex flex-col justify-center items-center relative">
                    <div className="w-11/12 h-full flex relative">
                        <input type="text" ref={inputRef} onChange={(e) => { setInputData(e.target.value) }} className=" w-full h-full text-white rounded-full bg-zinc-950 border-2  border-slate-500 p-5 text-xl focus:border-slate-200 duration-300 outline-1 outline-none" placeholder="Search..." />
                        {inputData.length ? <img width="42" height="42" onClick={(e) => { ResetInputData() }} className="ml-4 mt-2 hover:bg-zinc-800 rounded-full absolute -top-0.5 right-2 z-10 transition duration-300" src="https://img.icons8.com/ios/100/FFFFFF/multiply.png" alt="multiply" /> : null}
                    </div>
                    {(inputData.length > 0) ?<SearchedDataComponent inputData={inputData}/>:null}
                </div>
                <div className="flex justify-around items-center flex-none h-14 w-full backdrop-blur-lg border-0 border-b-0.5 border-slate-600 sticky top-0 z-10 text-white text-xl">
                    <div className=" relative"><div className="absolute top-9 bg-sky-500 rounded-full h-1.5 w-full"></div>Explore</div>
                    <div>Recent</div>
                </div>
            </div>

            <div className=" xl:w-96 w-0 h-0 xl:h-screen overflow-scroll xl:p-3 p-0 xl:border-l-0.5 border-0 border-slate-600 flex-none">
                    <div className=" bg-slate-500 w-full h-96 rounded-lg mb-4"></div>
                    <div className=" bg-slate-400 w-full h-96 rounded-lg mb-4"></div>
                    <div className=" bg-slate-500 w-full h-80 rounded-lg mb-4"></div>
                    <div className=" bg-slate-500 w-full h-40 rounded-lg mb-4"></div>
            </div>
        </div>

    )
}

function SearchedDataComponent(props) {
    const { getSearchedUser } = useUserHandler()
    const [listOfSearchedUsers, setlistOfSearchedUsers] = useState([])


    useEffect(() => {
        getSearchedUser(props.inputData,(users) => {
            setlistOfSearchedUsers([...users])
        })
    }, [props.inputData])

    const listOfUsersDiv = listOfSearchedUsers.map(users => 
        <div role={"button"} key={users.id} className=" text-white p-2 hover:border-0.5 border-slate-500 hover:bg-black hover:scale-105 rounded-lg transition duration-100 ease-in-out">
            <Link to={`/home/profile/${users.permanentUsername}`} className=" w-full h-full flex items-center ">
            <div className=" h-10 w-10 bg-slate-500 rounded-full"></div>
            <div className=" pl-5">
                {users.permanentUsername}
            </div>
            </Link>
        </div>
    ) 

    return (
        <div className=" bg-zinc-950 h-96 w-5/6 absolute top-20 z-20 rounded-xl shadow-2xl shadow-slate-400 border-0.5 border-slate-500 ">
            {listOfUsersDiv}
            {listOfUsersDiv}
            {listOfUsersDiv}
            {listOfUsersDiv}
            {listOfUsersDiv}
            {listOfUsersDiv}
            {listOfUsersDiv}
        </div>
    )
}