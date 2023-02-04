
import React from 'react';
import { Message, WebRepository } from '../api/api';
import { UserInfo } from './UserInfo';

type Props =  {
    user: string
}
type Messages = Message[]
type MessagesState = {
    messages: Messages,
    message: string
}

export class MessageBox extends React.Component<{user?: string}> {

    state: MessagesState = {
        messages: [],
        message: ""
    }

    constructor(props: Props) {
        super(props);
        this.state = {messages: [{
                author: "system", 
                content:"Welcome to the chat"}],
            message:  ""};
      }

    public UpdateMessages(newMessage: Message) {
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
        WebRepository.sendMessage(
            {
                author: this.props.user || "",
                content: this.state.message
            })
        this.setState((prevState: MessagesState) => ({
            message: "",
            messages: prevState.messages
        }))
        
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
                    <div className='Message'>
                        <p>{message.author}</p>
                        <br/>
                        <p>{message.content}</p>
                    </div>
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