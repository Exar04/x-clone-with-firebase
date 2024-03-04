import { useState } from "react"

export function Home() {
    const [wok, setwok] = useState(false)
    return (
        <div className="h-screen w-screen flex">
            <div className="w-72 flex-none bg-slate-700 h-screen flex flex-col">{/*SideBar*/}
                <div className=" text-3xl text-white font-bold font-serif m-4 flex-none">Logo</div>
                <div className=" bg-yellow-400 flex-grow overflow-scroll">
                    <div className="p-3 m-2 text-xl text-white bg-blue-400 rounded-full text-center">Home</div>
                    <div className="p-3 m-2 text-xl text-white bg-blue-400 rounded-full text-center">Message</div>
                </div>
                <div className="bg-black h-24 flex-none"> hehe</div>
            </div>
            <div className=" bg-green-800 h-screen w-full">{/*homepage*/}

            </div>
        </div>
    )
}

function PopUpSidebar({setwok, wok}) {
    return (
        <div className={`flex absolute items-center text-white w-screen h-screen overflow-x-hidden `}>
            <div className="absolute bg-slate-300 opacity-40 w-screen h-screen" onClick={() => {setwok(!wok)}}></div>
            <div className=" m-3 p-3 w-64 bg-gray-800 rounded-lg h-2/3 overflow-y-scroll z-30">
                <div className="mx-4 text-xl text-center overflow-y-scroll">
                    <div className="p-2 m-1 bg-green-300 rounded-lg">Home</div>
                    <hr class="h-px mt-4 mb-4 bg-gray-500 border-0 " />
                    <div className="p-2 m-1">Messages</div>
                    <hr class="h-px mt-4 mb-4 bg-gray-500 border-0 " />
                    <div className="p-2 m-1">Notification</div>
                    <hr class="h-px mt-4 mb-4 bg-gray-500 border-0 " />
                    <div className="p-2 m-1">Notification</div>
                    <hr class="h-px mt-4 mb-4 bg-gray-500 border-0 " />
                    <div className="p-2 m-1">Notification</div>
                    <hr class="h-px mt-4 mb-4 bg-gray-500 border-0 " />
                    <div className="p-2 m-1">Notification</div>
                    <hr class="h-px mt-4 mb-4 bg-gray-500 border-0 " />
                    <div className="p-2 m-1">Notification</div>
                    <hr class="h-px mt-4 mb-4 bg-gray-500 border-0 " />
                    <div className="p-2 m-1">Notification</div>
                </div>
            </div>
        </div>
    )
}

function NavBar() {
    return (
        <div className="bg-slate-500 w-screen h-16 flex justify-between">
            <div className=" text-3xl text-white ">C</div>
            <div className="flex w-full justify-center">
                <div className=" mx-5 p-3">wo</div>
                <div className=" mx-5 p-3">wo</div>
                <div className=" mx-5 p-3">wo</div>
            </div>
            <div className="">wo</div>
        </div>
    )
}