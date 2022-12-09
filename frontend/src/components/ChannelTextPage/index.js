import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchChannels } from "../../store/channels";
import { createMessage, deleteMessage, fetchMessages, updateMessage } from "../../store/messages";
import { fetchUsers } from "../../store/users";
import { createDchannel, fetchDchannels } from "../../store/dchannels";
import { createConsumer } from "@rails/actioncable";
import './ChannelTextPage.css'

const ChannelTextPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id, channelId } = useParams();
    const sessionUser = useSelector(state => state.session.user)
    const [loaded, setLoaded] = useState(false);
    const [messagesLoaded, setMessagesLoaded] = useState(false);
    const [usersLoaded, setUsersLoaded] = useState(false);
    const channels = useSelector(state => state.channels)
    const dchannels = useSelector(state => state.dchannels)
    const stateMessages = useSelector(state => state.messages)
    const users = useSelector(state => state.users)
    const [editing, setEditing] = useState(false);
    const [editText,setEditText] = useState('');
    const [editId, setEditId] = useState();
    
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState("");

    useEffect(() => {
        let cable = createConsumer("wss://fishcord.herokuapp.com/cable"); //"ws://localhost:5000/cable"

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
        dispatch(fetchChannels(id)).then(() => {
            setLoaded(true);
            let scrollDiv = document.getElementsByClassName("channel-text-messages-container")[0];
            scrollDiv.scrollTop = scrollDiv.scrollHeight;
        });
        dispatch(fetchDchannels(sessionUser.id));
    }, [channelId])

    useEffect(() => {
        dispatch(fetchMessages(channelId)).then(() => {
            setMessagesLoaded(true);
            let scrollDiv = document.getElementsByClassName("channel-text-messages-container")[0];
            scrollDiv.scrollTop = scrollDiv.scrollHeight;
        });
        dispatch(fetchUsers(id)).then(() => setUsersLoaded(true));
    }, [channelId, messages, id])

    const usersList = Object.values(users).map((user) => (
        <div className="user-list-item-container" key={user.id}>
            <div className="user-list-item-pfp"></div>
            <div className="user-list-item-username">{user.username}</div>
            {user.id !== sessionUser.id && <div className="user-list-item-dm" onClick={() => {
                let hasDM = false;
                Object.values(dchannels).forEach((dchannel) => {
                    if ((dchannel.user1Id === sessionUser.id && dchannel.user2Id === user.id) || (dchannel.user2Id === sessionUser.id && dchannel.user1Id === user.id)) {
                        hasDM = true;
                        history.push(`/channels/@me/${dchannel.id}`)
                    }
                })
                if (!hasDM) {
                    dispatch(createDchannel({user_1_id: sessionUser.id, user_2_id: user.id, user1_name: sessionUser.username, user2_name: user.username}));
                    history.push(`/channels/@me`)
                }
            }}>DM</div>}
        </div>
    ))

    const convertDate = (date) => {
        let strDate = new Date(date);
        return(strDate.toLocaleDateString() + " " + strDate.toLocaleTimeString())
    }

    const handleDelete = (messageId) => {
        dispatch(deleteMessage(messageId));
    }

    const cancelEditDiv = () => {
        setEditText('');
        setEditing(false);
        setEditId('');
    }

    const handleUpdateMessage = (e) => {
        e.preventDefault();
        dispatch(updateMessage({id: editId, content: editText, author_id: sessionUser.id, chatroom_id: channelId, author_name: sessionUser.username})).then(() => {
            cancelEditDiv()
        })
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
                    {(message.authorId === sessionUser.id || message.author_id === sessionUser.id) && <div className="message-edit-container">
                        <div className="message-edit-box">
                            <div className="message-edit-btn" onClick={() => {setEditing(true); setEditId(message.id); setEditText(message.content)}}>
                                <svg aria-hidden='true' role='img' className="svg-22-edit" width="16" height="16" viewBox="0 0 24 24">
                                    <path fill="#8e9297" d="M19.2929 9.8299L19.9409 9.18278C21.353 7.77064 21.353 5.47197 19.9409 4.05892C18.5287 2.64678 16.2292 2.64678 14.817 4.05892L14.1699 4.70694L19.2929 9.8299ZM12.8962 5.97688L5.18469 13.6906L10.3085 18.813L18.0201 11.0992L12.8962 5.97688ZM4.11851 20.9704L8.75906 19.8112L4.18692 15.239L3.02678 19.8796C2.95028 20.1856 3.04028 20.5105 3.26349 20.7337C3.48669 20.9569 3.8116 21.046 4.11851 20.9704Z"></path>
                                </svg>
                            </div>
                            <div className="message-delete-btn" onClick={() => {handleDelete(message.id)}}>
                                <svg aria-hidden='true' role='img' className="svg-22-delete" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="#8e9297" d="M15 3.999V2H9V3.999H3V5.999H21V3.999H15Z"></path>
                                    <path fill="#8e9297" d="M5 6.99902V18.999C5 20.101 5.897 20.999 7 20.999H17C18.103 20.999 19 20.101 19 18.999V6.99902H5ZM11 17H9V11H11V17ZM15 17H13V11H15V17Z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>}
                </div>
                {editing && editId === message.id ? 
                    <form className="message-content-edit-div" onSubmit={handleUpdateMessage}>
                        <input type="text" className="channel-messages-edit-text" value={editText} onChange={(e) => setEditText(e.target.value)}>
                        </input>
                        <div className="message-edit-text">
                            click to<div className="cancel-edit-div" onClick={() => {cancelEditDiv()}}>&nbsp;cancel&nbsp;</div>enter to<input type="submit" className="message-edit-confirm" value="submit"></input>
                        </div>
                    </form>:
                    <div className="message-content-div">
                        {message.content}
                    </div>
                    }
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