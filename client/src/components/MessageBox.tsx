
import React from 'react';
import { WebRepository } from '../api/api';

type Props = {}
type Messages = string[]
type MessagesState = {
    messages: Messages
}

export class MessageBox extends React.Component {

    state: MessagesState = {
        messages: []
    }

    constructor(props: Props) {
        super(props);
        this.state = {messages: ["Welcome to the new channel"]};
      }

    public UpdateMessages(newMessage: string) {
        this.setState((prevState: MessagesState) => ({
            messages: [...prevState.messages, newMessage]
        }))
    }    

    componentDidMount(): void {
        WebRepository.setMessagesContainer(this);
    }

    render() { return (
        <>
            <h4>Messages:</h4>
            <div className='MessageBox'>
                {this.state.messages.map((message) => (
                    <>
                    <p>{message}</p> <br/>
                    </>
                ))}
            </div>
            <button onClick={() => WebRepository.sendMessage("debug")}> Debug add message</button>
        </>  
        )
    }
}