import { useState } from "react";

export function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const login = async() => {}
  return (
    <div>
      <div className=" flex justify-center items-center w-screen h-screen bg-slate-100">
        <div className=" w-1/3  min-h-fit min-w-80 bg-white rounded-2xl p-4 border-2">

          <div className="text-3xl text-center my-4">Login</div>

          <div className="m-4 w-auto text-center">
            <input className=" mt-0 w-full h-12 border-2 rounded-md my-8 text-center text-xl" placeholder="Username" />
            <input className="w-full h-12 border-2 rounded-md mb-8 text-center text-xl" placeholder="Password"/>
          <div className=" bg-violet-600 h-12 rounded-lg text-center text-white font-bolt text-xl p-2">LogIn</div>

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