import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchChannels } from "../../store/channels";
import { createMessage, fetchMessages } from "../../store/messages";
import { fetchUser, fetchUsers } from "../../store/users";
import { createConsumer } from "@rails/actioncable";
import './ChannelTextPage.css'

const ChannelTextPage = () => {
    const dispatch = useDispatch();
    const { id, channelId } = useParams();
    const sessionUser = useSelector(state => state.session.user)
    const [loaded, setLoaded] = useState(false);
    const [messagesLoaded, setMessagesLoaded] = useState(false);
    const [usersLoaded, setUsersLoaded] = useState(false);
    const channels = useSelector(state => state.channels)
    const servers = useSelector(state => state.servers)
    const stateMessages = useSelector(state => state.messages)
    const users = useSelector(state => state.users)
    
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState("");

    useEffect(() => {
        let cable = createConsumer("ws://localhost:5000/cable");

        const paramsToSend = {
            channel: "ConversationChannel",
            id: channelId
        }

        const handlers = {
            received(data) {
                setMessages([...messages, data])
            },

            connected() {
                console.log("connected")
            },

            disconnected() {
                console.log("disconnected")
            }
        }

        const subscription = cable.subscriptions.create(paramsToSend, handlers)

        return function cleanup() {
            console.log("unsubbing from ", channelId)
            subscription.unsubscribe();
        }

    }, [channelId, messages])

    useEffect(() => {
        dispatch(fetchChannels(id)).then(() => setLoaded(true));
    }, [channelId])

    useEffect(() => {
        dispatch(fetchMessages(channelId)).then(() => {
            setMessagesLoaded(true);
        });
        dispatch(fetchUsers(id)).then(() => setUsersLoaded(true));
    }, [channelId, messages])

    const usersList = Object.values(users).map((user) => (
        <div className="user-list-item-container" key={user.id}>
            <div className="user-list-item-pfp"></div>
            <div className="user-list-item-username">{user.username}</div>
        </div>
    ))

    const convertDate = (date) => {
        let strDate = new Date(date);
        return(strDate.toLocaleDateString() + " " + strDate.toLocaleTimeString())
    }
 
    const messagesList = Object.values(stateMessages).map((message) => (
        <div className="message-container" key={`${message.id}`}>
            <div className="message-pfp-div"></div>
            <div className="message-div">
                <div className="message-info-container">
                    {<div className="message-author-div">
                        {message.authorName || message.author_name}
                    </div>}
                    {<div className="message-date-div">
                        {convertDate(message.createdAt) || convertDate(message.created_at)}
                    </div>}
                </div>
                <div className="message-content-div">
                    {message.content}
                </div>
            </div>
        </div>
    )) 

    const sendMessage = (e) => {
        e.preventDefault();
        dispatch(createMessage({content: content, author_id: sessionUser.id, chatroom_id: channelId, author_name: sessionUser.username})).then(() => {
            let scrollDiv = document.getElementsByClassName("channel-text-messages-container")[0];
            scrollDiv.scrollTop = scrollDiv.scrollHeight;
        })
        setContent("");
    }

    return loaded && messagesLoaded && usersLoaded && (
        <div className="channel-text-page-container">
            <div className="channel-text-page-header">
                <div className="channel-header-tag-img">
                    <svg className="svg-22"><path fill='#8e9297' d='M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z'></path></svg>
                </div>
                <div className="channel-header-text">
                    {channels[channelId] && channels[channelId].name}
                </div>
            </div>
            <div className="channel-content-container">
                <div className="channel-text-container">
                    <div className="channel-text-messages-container">
                        {messagesList}
                    </div>
                    <form className="channel-text-messages-form-container" onSubmit={sendMessage}>
                        <input type="text" className="channel-text-messages-form-text" placeholder="Send a Message" value={content} onChange={(e) => setContent(e.target.value)}>
                        </input>
                    </form>
                </div>
                <div className="channels-users-container">
                    <div className="channels-users-members">MEMBERS</div>
                    {usersList}
                </div>
            </div>
        </div>
    )
}

export default ChannelTextPage;