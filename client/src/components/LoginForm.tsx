import { Dispatch, SetStateAction, useState } from "react"
import { connectToChatroom } from "../api/api";

type params = {
    setLogin: () => void
}

export function LoginForm(params: params) {

    let [username, setUsername] = useState("");

    const handleButton = () => {
        try {
            connectToChatroom(username, "test");
            console.log("Connected to the room")
            params.setLogin();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="login">
            <h3>Please type in your username</h3>
            <input type="text" onChange={(e) => setUsername(e.target.value)} value={username}/>
            <button onClick={handleButton}></button>
        </div>
    )
}