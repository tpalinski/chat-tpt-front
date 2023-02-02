import { io } from "socket.io-client";
import { MessageBox } from "../components/MessageBox";
const BASE_URL = "localhost:3001"
const socket = io(BASE_URL);
const REQUEST_URL = "http://" + BASE_URL

type RoomParams = {username: string, room: string}
export type UserData = {
    email: string,
    password: string,
    nickname?: string
}

export function connectToChatroom(username: string, room: string) {
    let param: RoomParams = {username, room}
    console.log("Tried to connect to room")
    socket.emit("join-room", param, (response: Response) => {
        //@ts-ignore
        if(response.status !== "ok"){
            throw new Error("Could not connect to the websocket")
        }
    });
}

socket.on("message", (messageContent: string) => {
    console.log(`Received message: ${messageContent}`)
    WebRepository.updateMessages(messageContent);
})

export class WebRepository {
    private static messagesInstance: MessageBox

    static setMessagesContainer(container: MessageBox) {
        WebRepository.messagesInstance = container;
    }

    static updateMessages(message: string) {
        this.messagesInstance.UpdateMessages(message);
    }

    static sendMessage(message: string) {
        socket.emit("send-message", message)
    }
}

/** Attempt to authenticate this client establishing http session
 * @returns response status code if error, null if successful
 * @param user 
 * Submitted credentials
 */
export async function login(user: UserData): Promise<number | null> {
    console.log(JSON.stringify(user))
    let response = await fetch(REQUEST_URL + "/user/login", {
        method: 'post',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    })
    if(response.ok) {
        return null
    } else {
        return response.status
    }
}


