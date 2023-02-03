import { useState } from "react"
import { getUserData, UserData } from "../api/api"



export function UserInfo() {

    let [userData, setUserData] = useState<UserData>({email: "", nickname: ""})

    const handleClick = () => {
        getUserData().then(res => {
            if(res) {
                console.log(res)
            }
        })
    }

    return (
        <div className="UserInfo">
            <button onClick={() => handleClick()}>Get my info</button>
        </div>
    )
}