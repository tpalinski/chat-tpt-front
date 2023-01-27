import { useState } from "react"
import { connectToChatroom } from "../api/api";
import Select from "react-select";
import { SingleValue } from "react-select/dist/declarations/src";

type params = {
    setLogin: () => void
}

type Option = {value: string, label: string}
const channels: Option[] = [
    {value: "global", label: "Global"},
    {value: "tech", label: "New tech"},
    {value: "music", label: "Music"},
    {value: "random", label: "Random Stuff"},
]

export function LoginForm(params: params) {

    let [username, setUsername] = useState("");
    let [channel, setChannel] = useState(channels[0]);

    const handleButton = () => {
        try {
            connectToChatroom(username, "test");
            console.log("Connected to the room")
            params.setLogin();
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (newChannel: SingleValue<Option>) => {
        if (newChannel) {
            setChannel(newChannel)
        }
    }

    return (
        <div className="Login">
            <form onSubmit={(e) => {
                e.preventDefault();
                handleButton();
            }}>
                <div className="Form-Container">
                    <h3>Username</h3>
                    <input type="text" onChange={(e) => setUsername(e.target.value)} value={username}/>
                </div>
                <div className="Form-Container">
                    <h3>Room</h3>
                    <Select options={channels} value={channel} onChange={handleChange} className="Select"/>
                </div>
                <button onClick={handleButton}>Join room</button>
            </form>
        </div>
    )
}