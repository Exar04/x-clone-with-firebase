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

    function pfpImageUploader(){
        setOpenPfpImageUploader(true)
    }
    function BackgroundImageUploader(){
        setOpenBackgroundImageUploader(true)
    }
    return(
        <div className=" bg-zinc-900 w-full h-full p-6">
            <div className=" text-white ring-2 ring-white hover:ring-pink-500 hover:ring-1  rounded-lg p-3 my-5 w-fit transition  duration-400 ease-in-out hover:translate-x-5">Change Display Name</div>
            <div className=" text-white ring-2 ring-white hover:ring-pink-500 hover:ring-1  rounded-lg p-3 my-5 w-fit transition  duration-400 ease-in-out hover:translate-x-5">Change Bio</div>
            <div onClick={() => pfpImageUploader()} className=" text-white ring-2 ring-white hover:ring-pink-500 hover:ring-1  rounded-lg p-3 my-5 w-fit transition  duration-400 ease-in-out hover:translate-x-5">Change Profile Image</div>
            <div onClick={() => BackgroundImageUploader()} className=" text-white ring-2 ring-white hover:ring-pink-500 hover:ring-1  rounded-lg p-3 my-5 w-fit transition  duration-400 ease-in-out hover:translate-x-5">Change Background Image</div>
            <div className=" text-white ring-2 ring-white hover:ring-pink-500 hover:ring-1  rounded-lg p-3 my-5 w-fit transition  duration-400 ease-in-out hover:translate-x-5">Change Profession</div>
            <div className=" text-white ring-2 ring-white hover:ring-pink-500 hover:ring-1  rounded-lg p-3 my-5 w-fit transition  duration-400 ease-in-out hover:translate-x-5">Change BirthDate</div>

            { openPfpImageUploader? <UploadPfPImage setOpenPfpImageUploader={setOpenPfpImageUploader}/>:"" }
            { openBackgroundImageUploader? <UploadBackgroundImage setOpenBackgroundImageUploader={setOpenBackgroundImageUploader}/>: "" }
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