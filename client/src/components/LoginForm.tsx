import { useState } from "react"
import { connectToChatroom, login, UserData } from "../api/api";
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

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("")
    let [channel, setChannel] = useState(channels[0]);

    const handleButton = () => {
        try {
            connectToChatroom(email, "test");
            let userData: UserData = {
                email,
                password
            }
            login(userData).then(res => {
                console.log(res)
                if(!res){
                    params.setLogin();
                } else {
                    alert(`Error while logging in: ${res}`)
                }
            })
            console.log("Connected to the room")
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
                    <h3>Email</h3>
                    <input type="text" onChange={(e) => setEmail(e.target.value)} value={email}/>
                </div>
                <div className="Form-Container">
                    <h3>Password</h3>
                    <input type="text" onChange={(e) => setPassword(e.target.value)} value={password}/>
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