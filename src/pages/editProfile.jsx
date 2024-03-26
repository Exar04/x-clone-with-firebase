import { useState } from "react"

import 'react-image-crop/dist/ReactCrop.css'
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop }  from 'react-image-crop'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { db, Imagedb } from "../config/firebase"
import { uuidv4 } from "@firebase/util"
import { useLoggedInUserInfo } from "../hooks/userHandler"
import { updateDoc, where, doc, collection, query, getDocs, onSnapshot } from "firebase/firestore"


export function EditProfile() {
    const [openPfpImageUploader, setOpenPfpImageUploader] = useState(false)
    const [openBackgroundImageUploader, setOpenBackgroundImageUploader] = useState(false)
    const [openChangeUserBio, setOpenChangeUserBio] = useState(false)
    const [openChangeUserDisplayName, setOpenChangeUserDisplayName] = useState(false)
    const [openChangeUserProfession, setOpenChangeUserProfession ] = useState(false)

    function ChangeUserProfessionOpener() {
        setOpenChangeUserProfession(true)
    }

    function ChangeUserDisplayNameOpener(){
        setOpenChangeUserDisplayName(true)
    }

    function pfpImageUploader(){
        setOpenPfpImageUploader(true)
    }
    function BackgroundImageUploader(){
        setOpenBackgroundImageUploader(true)
    }
    
    function ChangeUserBioOpener() {
        setOpenChangeUserBio(true)
    }

    // const [editOptions, setEditOptions] = useState([
    //     {text: "Change Display Name", doThis:ChangeDisplayNameOpener},
    //     {text: "Change Profile Image", doThis:ChangeDisplayNameOpener},
    //     {text: "Change Background Image", doThis:ChangeDisplayNameOpener},
    //     {text: "Change Change Bio", doThis:ChangeDisplayNameOpener},
    //     {text: "Change Profession", doThis:ChangeDisplayNameOpener},
    //     {text: "Change BirthDate", doThis:ChangeDisplayNameOpener},
    // ])

    return(
        <div className=" bg-zinc-900 w-full h-full p-6">
            <div onClick={() => ChangeUserDisplayNameOpener()} className=" text-white ring-2 ring-white hover:ring-pink-500 hover:ring-1  rounded-lg p-3 my-5 w-fit transition  duration-400 ease-in-out hover:translate-x-5">Change Display Name</div>
            <div onClick={() => ChangeUserBioOpener()} className=" text-white ring-2 ring-white hover:ring-pink-500 hover:ring-1  rounded-lg p-3 my-5 w-fit transition  duration-400 ease-in-out hover:translate-x-5">Change Bio</div>
            <div onClick={() => pfpImageUploader()} className=" text-white ring-2 ring-white hover:ring-pink-500 hover:ring-1  rounded-lg p-3 my-5 w-fit transition  duration-400 ease-in-out hover:translate-x-5">Change Profile Image</div>
            <div onClick={() => BackgroundImageUploader()} className=" text-white ring-2 ring-white hover:ring-pink-500 hover:ring-1  rounded-lg p-3 my-5 w-fit transition  duration-400 ease-in-out hover:translate-x-5">Change Background Image</div>
            <div onClick={() => ChangeUserProfessionOpener()} className=" text-white ring-2 ring-white hover:ring-pink-500 hover:ring-1  rounded-lg p-3 my-5 w-fit transition  duration-400 ease-in-out hover:translate-x-5">Change Profession</div>
            <div className=" text-white ring-2 ring-white hover:ring-pink-500 hover:ring-1  rounded-lg p-3 my-5 w-fit transition  duration-400 ease-in-out hover:translate-x-5">Change BirthDate</div>

            { openPfpImageUploader? <UploadPfPImage setOpenPfpImageUploader={setOpenPfpImageUploader}/>:"" }
            { openBackgroundImageUploader? <UploadBackgroundImage setOpenBackgroundImageUploader={setOpenBackgroundImageUploader}/>: "" }
            { openChangeUserBio? <ChangeUserBio setOpenChangeUserBio={setOpenChangeUserBio}/>:""}
            { openChangeUserDisplayName? <ChangeUserDisplayName setOpenChangeUserDisplayName={setOpenChangeUserDisplayName}/>:""}
            { openChangeUserProfession? <ChangeUserProfession setOpenChangeUserProfession={setOpenChangeUserProfession}/>:""}
        </div>
    )
}

function ChangeUserProfession(props) {
    const { userIdOfLoggedInUser } = useLoggedInUserInfo()
    const [newProfession, setNewProfession] = useState("")

    function changeProfessionOnclick() {
        const userDocRef = doc(db, "users", userIdOfLoggedInUser )
        updateDoc(userDocRef, {
            profession: newProfession 
        }).then(() => {
            props.setOpenChangeUserProfession(false)
        })
    }
 
    return(
        <div className=" flex justify-center items-center absolute w-screen h-screen top-0 left-0">
            <div className=" z-10 bg-white/5 relative h-auto md:w-auto w-5/6 p-6 flex flex-col justify-center items-center rounded-lg -top-20 ">
                <div className=" absolute top-0 left-0 bg-white/30 -z-10 w-full h-full rounded-xl blur-2xl"></div>
                <div className=" bg-black w-full h-full p-6 rounded-lg ">
                    <input onChange={(e) => { setNewProfession(e.target.value)}} type="text" placeholder="Change Profession" className=" md:w-96 w-full my-2 rounded-md h-12 p-3 text-center flex-none text-lg  ring-2 ring-white bg-black text-white outline-none" />
                    <div onClick={() => { changeProfessionOnclick() }} className=" bg-black md:w-96 w-full h-12 my-2 flex-none flex justify-center items-center rounded-lg ring-2 ring-white text-white hover:bg-white hover:text-black transition duration-300">Save</div>

                </div>
            </div>
            <div onClick={() => {props.setOpenChangeUserProfession(false)}} className=" absolute w-screen h-screen backdrop-blur-sm top-0 left-0"></div>
        </div>
    )
}

function ChangeUserDisplayName(props) {
    const { userIdOfLoggedInUser } = useLoggedInUserInfo()
    const [newUsername, setNewUsername] = useState("")

    function changeUsernameOnclick() {
        const userDocRef = doc(db, "users", userIdOfLoggedInUser )
        updateDoc(userDocRef, {
            username: newUsername
        }).then(() => {
            props.setOpenChangeUserDisplayName(false)
        })
    }
    return(
        <div className=" flex justify-center items-center absolute w-screen h-screen top-0 left-0">
            <div className=" z-10 bg-white/5 relative h-auto md:w-auto w-5/6 p-6 flex flex-col justify-center items-center rounded-lg -top-20 ">
                <div className=" absolute top-0 left-0 bg-white/30 -z-10 w-full h-full rounded-xl blur-2xl"></div>
                <div className=" bg-black w-full h-full p-6 rounded-lg ">
                    <input onChange={(e) => { setNewUsername(e.target.value)}} type="text" placeholder="Display Name" className=" md:w-96 w-full my-2 rounded-md h-12 flex-none text-center text-lg p-3 ring-2 ring-white bg-black text-white outline-none" />
                    <div role={"button"} onClick={() => changeUsernameOnclick()} className=" bg-black md:w-96 w-full h-12 my-2 flex-none flex justify-center items-center rounded-lg ring-2 ring-white text-white text-lg hover:bg-white hover:text-black transition duration-300">save</div>

                </div>
            </div>
            <div onClick={() => {props.setOpenChangeUserDisplayName(false)}} className=" absolute w-screen h-screen backdrop-blur-sm top-0 left-0"></div>
        </div>
    )
}

function ChangeUserBio(props) {
    const { userIdOfLoggedInUser } = useLoggedInUserInfo()
    const [newBio, setNewBio] = useState("")

    function changeBioOnclick() {
        const userDocRef = doc(db, "users", userIdOfLoggedInUser )
        updateDoc(userDocRef, {
            bio: newBio 
        }).then(() => {
            props.setOpenChangeUserBio(false)
        })
    }
    return(
        <div className=" flex justify-center items-center absolute w-screen h-screen top-0 left-0">
            <div className=" z-10 bg-white/5 relative h-auto w-auto p-6 flex flex-col justify-center items-center rounded-lg -top-20 ">
                <div className=" absolute top-0 left-0 bg-white/30 -z-10 w-full h-full rounded-xl blur-2xl"></div>
                <div className=" bg-black w-full h-full p-6 rounded-lg ">
                    <textarea onChange={(e) => { setNewBio(e.target.value)}} type="text" placeholder="Change bio here ..." className=" w-96 m-3 rounded-md h-40 flex-none text-xl p-3 ring-2 ring-white bg-black text-white outline-none" />
                    <div role={"button"} onClick={changeBioOnclick} className=" bg-black w-96 h-12 m-4 flex-none flex justify-center items-center rounded-lg ring-2 ring-white text-white hover:bg-white hover:text-black transition duration-300">Save</div>

                </div>
            </div>
            <div onClick={() => {props.setOpenChangeUserBio()}} className=" absolute w-screen h-screen backdrop-blur-sm top-0 left-0"></div>
        </div>
    )
}

function UploadBackgroundImage(props) {
    const { permanentUsernameOfLoggedInUser, BackgroundImageUrlOfLoggedInUser} = useLoggedInUserInfo()
    const usersCollectionRef = collection(db, "users");
    
    const [isLoading, setIsLoading] = useState(false)
    const [inputImage, setInputImage] = useState("")
    const [isHeightGreater, setIsHeightGreater] = useState(false)
    const [imageCrop, setImageCrop] = useState({
        unit: 'px', // Can be 'px' or '%'
        x: 25,
        y: 25,
        width: 50,
        height: 50,
        aspect: 1
    })

    function uploadBackgroundImageToServer() {
        let unsubscribe
        if (isLoading) {
            return
        }
        if (inputImage == "") {
            console.log("no input image")
            return
        }
        const imageRef = ref(Imagedb, `BackgroundImage/${uuidv4()}`)
        setIsLoading(true)
        uploadBytes(imageRef, inputImage).then(() => {
            return getDownloadURL(imageRef);
        }).then((downloadURL) => {

            const q = query(usersCollectionRef, where("permanentUsername", "==", permanentUsernameOfLoggedInUser));

            unsubscribe = onSnapshot(q, (snapshot) => {

                let userData = null;
                if (snapshot.size === 1) {
                    const docDeez = snapshot.docs[0];
                    userData = { id: docDeez.id, ...docDeez.data() };

                    const userDocRef = doc(db, "users", userData.id);
                    updateDoc(userDocRef, {
                        backgroundImage: downloadURL
                    })
                }
            })
            return () => unsubscribe()
        }).then(() => {
            setIsLoading(false)
            props.setOpenBackgroundImageUploader(false)
            alert("Changed Pfp sucessfully")
        }).catch((err) => {
            setIsLoading(false)
            alert("Error while sending image to server", err)
        })
    }

    function handleImageChange(event) {
        const file = event.target.files[0]
        setInputImage(file)

        const reader = new FileReader();

        reader.onload = function (e) {
            
            const image = new Image();
            image.onload = function () {
                // onImageLoad(e, image.width, image.height)
                if (image.height > image.width) {
                    setIsHeightGreater(true)
                } else if (image.width > image.height) {
                    setIsHeightGreater(false)
                }
            }
            image.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    return (
        <div className=" absolute top-0 left-0 flex justify-center items-center text-white h-screen w-screen">
            <div className=" sm:w-3/5 h-3/5 w-11/12 z-10 relative">
                <div className=" absolute top-0 left-0 bg-sky-500 w-full h-full rounded-xl blur-xl"></div>
                <div className=" absolute top-0 left-0 flex lg:flex-row flex-col bg-zinc-950 border-0.5 border-slate-500 w-full h-full rounded-xl">
                    <div className=" flex-1 p-5 flex justify-center items-center">
                        {
                            inputImage ? (
                                // <ReactCrop crop={imageCrop} onChange={c => setImageCrop(c)} keepSelection aspect={1} >
                                <img className={` rounded-lg ${isHeightGreater ? "h-full" : ""}`} src={URL.createObjectURL(inputImage)} alt="" />
                                // </ReactCrop>
                            )
                                : (
                                    BackgroundImageUrlOfLoggedInUser? 
                                    <img className={` rounded-lg`} src={BackgroundImageUrlOfLoggedInUser} />
                                    :
                                    <div className=" w-full h-full rounded-lg bg-slate-500"></div>
                                )
                        }
                    </div>
                    <div className=" lg:flex-1 lg:h-full lg:border-l-0.5 border-slate-400 h-20 w-full ">
                        <div className="lg:hidden border-t-0.5 w-full border-slate-400"></div> {/* This is just a line on ui  */}
                        <div className=" h-full w-full flex lg:flex-col flex-row justify-center items-center font-mono">
                            <label htmlFor="file-upload" className="m-2 p-2 ring-1 ring-white hover:bg-white hover:text-black rounded-lg transition duration-300 cursor-pointer">
                                Upload Image
                                <input id="file-upload" type="file" onChange={(e) => handleImageChange(e)} accept="image/*" className="hidden" />
                            </label>
                            {/* <label htmlFor="file-upload" className="cursor-pointer">Upload Image</label> */}
                            <div role={"button"} className=" m-2 p-2 ring-1 ring-white hover:bg-white hover:text-black rounded-lg transition duration-300" onClick={() => { uploadBackgroundImageToServer()}}>
                                { isLoading? "Uploading" : "Save" }
                                
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" absolute top-0 left-0 h-screen w-screen backdrop-blur-sm" onClick={() => props.setOpenBackgroundImageUploader(false)}></div>
        </div>
    )
}

function UploadPfPImage(props) {
    const { permanentUsernameOfLoggedInUser, PfpImageUrlOfLoggedInUser} = useLoggedInUserInfo()
    const usersCollectionRef = collection(db, "users");
    
    const [isLoading, setIsLoading] = useState(false)
    const [inputImage, setInputImage] = useState("")
    const [isHeightGreater, setIsHeightGreater] = useState(false)
    const [imageCrop, setImageCrop] = useState({
        unit: 'px', // Can be 'px' or '%'
        x: 25,
        y: 25,
        width: 50,
        height: 50,
        aspect: 1
    })

    function uploadPfpImageToServer() {
        let unsubscribe
        if (isLoading) {
            return
        }
        if (inputImage == "") {
            console.log("no input image")
            return
        }
        const imageRef = ref(Imagedb, `images/${uuidv4()}`)
        setIsLoading(true)
        uploadBytes(imageRef, inputImage).then(() => {
            return getDownloadURL(imageRef);
        }).then((downloadURL) => {

            const q = query(usersCollectionRef, where("permanentUsername", "==", permanentUsernameOfLoggedInUser));

            unsubscribe = onSnapshot(q, (snapshot) => {

                let userData = null;
                if (snapshot.size === 1) {
                    const docDeez = snapshot.docs[0];
                    userData = { id: docDeez.id, ...docDeez.data() };

                    const userDocRef = doc(db, "users", userData.id);
                    updateDoc(userDocRef, {
                        profileImage: downloadURL
                    })
                }
            })
            return () => unsubscribe()
        }).then(() => {
            setIsLoading(false)
            props.setOpenPfpImageUploader(false)
            alert("Changed Pfp sucessfully")
        }).catch((err) => {
            setIsLoading(false)
            alert("Error while sending image to server", err)
        })
    }

    function handleImageChange(event) {
        const file = event.target.files[0]
        setInputImage(file)

        const reader = new FileReader();

        reader.onload = function (e) {
            
            const image = new Image();
            image.onload = function () {
                // onImageLoad(e, image.width, image.height)
                if (image.height > image.width) {
                    setIsHeightGreater(true)
                } else if (image.width > image.height) {
                    setIsHeightGreater(false)
                }
            }
            image.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    return (
        <div className=" absolute top-0 left-0 flex justify-center items-center text-white h-screen w-screen">
            <div className=" sm:w-3/5 h-3/5 w-11/12 z-10 relative">
                <div className=" absolute top-0 left-0 bg-sky-500 w-full h-full rounded-xl blur-xl"></div>
                <div className=" absolute top-0 left-0 flex lg:flex-row flex-col bg-zinc-950 border-0.5 border-slate-500 w-full h-full rounded-xl">
                    <div className=" flex-1 p-5 flex justify-center items-center">
                        {
                            inputImage ? (
                                // <ReactCrop crop={imageCrop} onChange={c => setImageCrop(c)} keepSelection aspect={1} >
                                <img className={` rounded-lg ${isHeightGreater ? "h-full" : ""}`} src={URL.createObjectURL(inputImage)} alt="" />
                                // </ReactCrop>
                            )
                                : (
                                    PfpImageUrlOfLoggedInUser? 
                                    <img className={` rounded-lg`} src={PfpImageUrlOfLoggedInUser} />
                                    :
                                    <div className=" w-full h-full rounded-lg bg-slate-500"></div>
                                )
                        }
                    </div>
                    <div className=" lg:flex-1 lg:h-full lg:border-l-0.5 border-slate-400 h-20 w-full ">
                        <div className="lg:hidden border-t-0.5 w-full border-slate-400"></div> {/* This is just a line on ui  */}
                        <div className=" h-full w-full flex lg:flex-col flex-row justify-center items-center font-mono">
                            <label htmlFor="file-upload" className="m-2 p-2 ring-1 ring-white hover:bg-white hover:text-black rounded-lg transition duration-300 cursor-pointer">
                                Upload Image
                                <input id="file-upload" type="file" onChange={(e) => handleImageChange(e)} accept="image/*" className="hidden" />
                            </label>
                            {/* <label htmlFor="file-upload" className="cursor-pointer">Upload Image</label> */}
                            <div role={"button"} className=" m-2 p-2 ring-1 ring-white hover:bg-white hover:text-black rounded-lg transition duration-300" onClick={() => { uploadPfpImageToServer()}}>
                                { isLoading? "Uploading" : "Save" }
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" absolute top-0 left-0 h-screen w-screen backdrop-blur-sm" onClick={() => props.setOpenPfpImageUploader(false)}></div>
        </div>
    )
}