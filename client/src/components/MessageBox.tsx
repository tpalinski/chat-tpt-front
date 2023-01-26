
import React from 'react';
import { WebRepository } from '../api/api';

type Props = {}
type Messages = string[]
type MessagesState = {
    messages: Messages,
    message: string
}

export class MessageBox extends React.Component {

    state: MessagesState = {
        messages: [],
        message: ""
    }

    constructor(props: Props) {
        super(props);
        this.state = {messages: ["Welcome to the new channel"], message: ""};
      }

    public UpdateMessages(newMessage: string) {
        this.setState((prevState: MessagesState) => ({
            messages: [...prevState.messages, newMessage],
            message: prevState.message
        }))
    }
    
    handleMessageChange(newMessage: string){
        this.setState((prevState: MessagesState) => ({
            message: newMessage,
            messages: prevState.messages
        }));
    }


    handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        this.setState((prevState: MessagesState) => ({
            message: "",
            messages: prevState.messages
        }))
        WebRepository.sendMessage(this.state.message)
    }


    componentDidMount(): void {
        WebRepository.setMessagesContainer(this);
    }

    componentDidUpdate(): void {
        let scrollbox = document.getElementsByClassName("MessageBox")[0]
        scrollbox.scrollTop = scrollbox.scrollHeight
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
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <input onChange={(e) => this.handleMessageChange(e.target.value)} value={this.state.message} type="text"/>
                <button> Send Message </button>
            </form>
        </>  
        )
    }
}