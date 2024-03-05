import { useState } from "react";
import { useAuth } from "../context/authContext";

export function SignIn() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { signup } = useAuth()

  async function handleSubmit() {
    if (loading !== false) {
      return
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match")
    }else if ( password.length < 6) {
      return setError("Length of password must be greater than 6")
    }
    try{
      setError("")
      setLoading(true)
      await signup(email, password)
    } catch{
      setError("Failed to create an account")
    }
    setLoading(false)
  }
  return (
    <div>
        {error}
      <div className=" flex justify-center items-center w-screen h-screen bg-slate-100">
        <div className=" w-1/3  min-h-fit min-w-80 bg-white rounded-2xl p-4 border-2">

          <div className="text-3xl text-center my-4">SignUp</div>

          <div className="m-4 w-auto text-center">
            <input onChange={(e) => { setEmail(e.target.value) }} className=" mt-0 w-full h-12 border-2 rounded-md my-8 text-center text-xl" placeholder="Email" />
            <input onChange={(e) => { setPassword(e.target.value) }} className="w-full h-12 border-2 rounded-md mb-8 text-center text-xl" placeholder="Password" />
            <input onChange={(e) => { setConfirmPassword(e.target.value) }} className="w-full h-12 border-2 rounded-md mb-8 text-center text-xl" placeholder="Confirm Password" />
            <div onClick={(e) => {handleSubmit()}} role="button" className=" bg-violet-600 h-12 rounded-lg text-center text-white font-bolt text-xl p-2">Sign Up</div>

          </div>

          <div className=" ml-4 mt-4 text-center">
            Forgot password ?
          </div>

          <hr class="h-px mt-4 mb-4 bg-gray-200 border-0 dark:bg-gray-700" />
          <div className="flex">
            <div className="w-1/2 flex justify-center m-1 p-2 border-2 rounded-md">
              <img width="35" height="35" src="https://img.icons8.com/color/144/google-logo.png" alt="google-logo" />
            </div>
            <div className="w-1/2 flex justify-center m-1 p-2 border-2 rounded-md">
              <img width="35" height="35" src="https://img.icons8.com/ios-glyphs/120/github.png" alt="github" />
            </div>
          </div>
          <hr class="h-px mt-4 mb-4 bg-gray-200 border-0 dark:bg-gray-700" />

          <div className=" text-l text-center text-slate-500">Create A New Account!</div>
        </div>
      </div>
    </div>
  );
}