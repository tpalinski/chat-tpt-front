import { io } from "socket.io-client";

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

