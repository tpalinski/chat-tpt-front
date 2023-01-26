import { io } from "socket.io-client";
import { MessageBox } from "../components/MessageBox";

const socket = io("ws://localhost:3001");

type RoomParams = {username: string, room: string}

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


