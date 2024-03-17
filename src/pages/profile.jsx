import { useState } from "react"

export function Profile(props) {
    const [Posts, setPosts] = useState([
        { id: 1, Username: "Yash", data: "this is my first twitt" },
        { id: 2, Username: "Vinyas", data: "this is my first twitt" },
        { id: 3, Username: "Sajal", data: "this is my first twitt" },
    ])

    const listOfPostsDiv = Posts.map(post =>
        <div key={post.id} className="w-11/12 h-fit border text-white p-3 border-slate-400 rounded-lg m-3 flex-none">
            <div className="flex items-center">
                <div className="bg-gray-700 w-12 h-12 rounded-full mr-4"></div>
                <div>{post.Username}</div>
            </div>
            <div className=" w-10/12 relative left-16 flex-wrap flex">{post.data}</div>
        </div>
    )

    return (
        <div className="flex lg:flex-row flex-col">
            <div className="bg-zinc-950  h-screen lg:basis-4/6 flex flex-col items-center overflow-scroll relative">
                <div className="flex items-center h-20 w-full backdrop-blur-lg border-0 border-b-0.5 bg-black/70 border-slate-600 p-1 sticky top-0 z-10">
                    <img width="30" height="30" className=" ml-6" src="https://img.icons8.com/ios-filled/100/FFFFFF/back.png" alt="back" />
                    <div className="m-4">
                        <div className=" text-white font-bold text-2xl ml-6">Username</div>
                        <div className=" text-slate-500 text-sm ml-6">Number of post</div>
                    </div>
                </div>
                <div className=" w-full relative h-screen">
                    <div className=" bg-lime-900 w-full h-72"></div> {/* banner */}
                    <div className=" bg-slate-600 rounded-full w-48 h-48 absolute top-48 left-16 "></div> {/* Pfp */}
                    <div className=" h-96">
                        <div className=" h-28"></div> {/* just white space between pfp n content */}
                        <div className="m-3">
                            <div className=" ml-6 text-3xl font-bold text-white">Username</div>
                            <div className=" ml-6 text-xl  text-slate-600">@UserId</div>
                        </div>
                        <div className=" ml-9 mb-3 text-xl  text-white">Bio heh this is the biggest bio i can write, and yeah i know its pretty bad</div>
                        <div className="flex ml-9 text-xl">
                            <div className="flex text-slate-600 items-center mr-5"> <img width="25" height="25" className=" relative bottom-1 mr-2" src="https://img.icons8.com/pastel-glyph/64/404040/suitcase--v3.png" alt="suitcase--v3"/> Profession</div>
                            <div className="flex text-slate-600 items-center"><img width="25" height="20" className=" relative bottom-0 mr-0" src="https://img.icons8.com/sf-black/64/404040/party-baloon.png" alt="party-baloon"/> <div> Birth date</div></div>
                        </div>
                        <div className="flex ml-9 text-xl m-4">
                            <div className=" mr-5 flex"><div className="text-white mr-2">69</div> <div className=" text-slate-600 ">Followers</div></div>
                            <div className=" mr-5 flex"><div className="text-white mr-2">69</div> <div className=" text-slate-600 ">Following</div></div>
                        </div>
                    </div>

                    <div className="w-full h-16 flex justify-around text-2xl items-center text-white border-0 border-b-0.5 border-slate-500">
                        <div className=" relative"><div className="absolute top-10 bg-blue-500 rounded-full h-2 w-full"></div>Posts</div>
                        <div>Replies</div>
                        <div>Media</div>
                        <div>Liked</div>
                    </div>
                    <div className=" m-4">
                        <div className=" bg-slate-500 w-full h-40 rounded-lg mb-4"></div>
                        <div className=" bg-slate-500 w-full h-80 rounded-lg mb-4"></div>
                        <div className=" bg-slate-500 w-full h-40 rounded-lg mb-4"></div>
                        <div className=" bg-slate-500 w-full h-40 rounded-lg mb-4"></div>
                        <div className=" bg-slate-500 w-full h-80 rounded-lg mb-4"></div>
                        <div className=" bg-slate-500 w-full h-40 rounded-lg mb-4"></div>
                    </div>
                </div>
            </div>
            <div className="bg-zinc-950 lg:h-screen lg:basis-2/6 w-0 h-0 border-l-0.5 border-0 border-slate-600 text-white overflow-scroll">
                <div className=" m-4">
                        <div className=" bg-red-500 w-full h-96 rounded-lg mb-4"></div>
                        <div className=" bg-slate-400 w-full h-96 rounded-lg mb-4"></div>
                        <div className=" bg-slate-500 w-full h-80 rounded-lg mb-4"></div>
                        <div className=" bg-slate-500 w-full h-40 rounded-lg mb-4"></div>
                </div>
            </div>
        </div>

    )
}