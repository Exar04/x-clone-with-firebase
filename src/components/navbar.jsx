export function BottomNavBarForMobileView(props) {
    return (

        <div className="md:h-0 h-16 flex-none w-screen bg-red-500 ">
            <div onClick={() => { props.setIfUserWantsToPost(true) }} className=" absolute right-5 bottom-6 rounded-full w-20 h-20 md:w-0 md:h-0 bg-sky-500 flex justify-center items-center">
            <img width="48" height="48" src="https://img.icons8.com/android/48/FFFFFF/plus.png" alt="plus"/>
            </div>
        </div>
    )
}

export function TopNavBarForMobileView() {
    return (
        <div className=" md:h-0 h-16 flex-none w-screen bg-red-500 ">

        </div>
    )
}