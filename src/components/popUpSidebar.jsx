export function PopUpSidebar({ setwok, wok }) {
    return (
        <div className={`flex absolute items-center text-white w-screen h-screen overflow-x-hidden `}>
            <div className="absolute bg-slate-300 opacity-40 w-screen h-screen" onClick={() => { setwok(!wok) }}></div>
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