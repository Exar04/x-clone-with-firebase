import { useState } from "react"
import { auth } from "../config/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useAuth } from "../context/authContext"

export function Hehe() {
    const [u, su] = useState("")
    const [p, sp] = useState("")
    const { signup } = useAuth()

    function docreateit() {
        // createUserWithEmailAndPassword(auth, u, p)
        signup(u,p)

    }
    return (
        <div>
            hehe
            <input type="text" onChange={(e) => {su(e.target.value)}} />
            <input type="text" onChange={(e) => {sp(e.target.value)}} />
            <button onClick={docreateit}>sub</button>
        </div>
    )
}