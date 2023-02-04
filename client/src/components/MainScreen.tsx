import { useState, useEffect } from "react";
import { UserData, getUserData, logOut } from "../api/api";
import { MessageBox } from "./MessageBox";
import { UserInfo } from "./UserInfo";

type Props = {
    setLogin: () => void
}

export function MainScreen(props: Props) {

    let [userData, setUserData] = useState<UserData>({email: "", nickname: ""})

    useEffect(() => {
        getUserData().then(res => {
            if(!res) {
                setUserData({email: "unknown", nickname: "unknown"})
                alert("Error while fetching user data")
            } else { //successful fetch
                setUserData(res)
            }
        })
    }, [])

    const logout = () => {
        logOut().then(wasSuccessful => {
            if (wasSuccessful) {
                props.setLogin()
            } else {
                alert("Failed to log out")
            }
        })
    }

    return (
        <div className="MainApp">
            <UserInfo nickname={userData.nickname} logout={logout}/>
            <MessageBox user={userData.nickname}/>
        </div>
    )
}