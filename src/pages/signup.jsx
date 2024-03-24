import { ErrorFactory } from "@firebase/util";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { db } from "../config/firebase";
import { useAuth } from "../context/authContext";

export function SignUp() {

  const [email, setEmail] = useState("")
  const [permanentUsername, setPermanentUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const { signup } = useAuth()
  const usersCollectionRef = collection(db, "users");

  async function checkIfUsernameAlreadyExists(username) {
    const userExistSnapshot = query(usersCollectionRef, where("permanentUsername", "==", permanentUsername))
      const snapshot = await getDocs(userExistSnapshot);
      return !snapshot.empty
  }

  async function handleSubmit() {
    if (loading !== false) {
      return
    }

    if (permanentUsername.length > 3) {
      alert("Username must be atleast of 3 characters")
      return
    }

    if (password !== confirmPassword) {
      alert("Passwords doesn't match")
      return
    }
    try {
      setLoading(true)
      const exeerr = await checkIfUsernameAlreadyExists(permanentUsername) 
      if (exeerr) { 
        throw new Error('Username already exists. Please choose a different username.') 
      }
      await signup(email, password, permanentUsername)
      navigate("/home/timeline")

    } catch (err) {
      var errorMessage = ""
      switch (err.code) {
        case "auth/email-already-in-use":
          errorMessage = "The email address is already in use.";
          break;
        case "auth/weak-password":
          errorMessage = "The password is too weak.";
          break;
        case "auth/invalid-email":
          errorMessage = "The email address is not valid.";
          break;
        default:
          errorMessage = err.message;
          break;
      }
      alert(errorMessage)
    }
    setLoading(false)
  }
  return (
    <div>
      <div className=" flex justify-center items-center w-screen h-screen bg-slate-100">
        <div className=" w-1/3  min-h-fit min-w-80 bg-white rounded-2xl p-4 border-2">

          <div className="text-3xl text-center my-4">SignUp</div>

          <div className="m-4 w-auto text-center">
            <input onChange={(e) => { setEmail(e.target.value) }} className=" mt-0 w-full h-12 border-2 rounded-md my-8 text-center text-xl" placeholder="Email" />
            <input onChange={(e) => { setPermanentUsername(e.target.value) }} className=" mt-0 w-full h-12 border-2 rounded-md my-8 text-center text-xl" placeholder="Username" />
            <input onChange={(e) => { setPassword(e.target.value) }} className="w-full h-12 border-2 rounded-md mb-8 text-center text-xl" placeholder="Password" />
            <input onChange={(e) => { setConfirmPassword(e.target.value) }} className="w-full h-12 border-2 rounded-md mb-8 text-center text-xl" placeholder="Confirm Password" />
            <div onClick={() => { handleSubmit() }} className={`${loading ? "bg-violet-400" : " bg-violet-600"} h-12 rounded-lg text-center text-white font-bolt text-xl p-2`}>{loading ? <>Loading...</> : <>SignUp</>}</div>
          </div>

          <div className=" ml-4 mt-4 text-center">
            Forgot password ?
          </div>

          <hr className="h-px mt-4 mb-4 bg-gray-200 border-0 dark:bg-gray-700" />
          <div className="flex">
            <div className="w-1/2 flex justify-center m-1 p-2 border-2 rounded-md">
              <img width="35" height="35" src="https://img.icons8.com/color/144/google-logo.png" alt="google-logo" />
            </div>
            <div className="w-1/2 flex justify-center m-1 p-2 border-2 rounded-md">
              <img width="35" height="35" src="https://img.icons8.com/ios-glyphs/120/github.png" alt="github" />
            </div>
          </div>
          <hr className="h-px mt-4 mb-4 bg-gray-200 border-0 dark:bg-gray-700" />

          <Link to="/login"><div className=" text-l text-center text-slate-500">Already have an Account!</div></Link>
        </div>
      </div>
    </div>
  );
}