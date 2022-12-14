import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchChannels, createChannel} from '../../store/channels';
import { useHistory, useParams } from 'react-router-dom';
import './Channels.css'
import Modal from '../../Modal/Modal';

function ChannelsIndex() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const channels = useSelector(state => state.channels)
    const servers = useSelector(state => state.servers)
    const [visibleDrop, setVisibleDrop] = useState(false)
    const [modalOpen, setModalOpen] = useState(false);
    const [sendToEdit, setSendToEdit] = useState(false);
    const [channelName, setChannelName] = useState('general');
    const [channelId, setChannelId] = useState(1);

    const channelList = Object.values(channels)
    .map(channel => 
        <div className="channel-list-item" key={channel.id + "/channelId" + Math.random()} onClick={() => {history.push(`/servers/${id}/${channel.id}`)}}>
            <div className="channel-tag-img">
                <svg className="svg-22"><path fill='#8e9297' d='M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z'></path></svg>
            </div>
            <div className="channel-list-text">{channel.name}</div>
           {servers[id] && sessionUser.id === servers[id].ownerId && <div className="channel-tag-gear-container">
                <div className="channel-tag-gear">
                    <svg aria-hidden='true' role='img' className="svg-22-gear" onClick={() => {
                        setChannelId(channel.id); 
                        setSendToEdit(true); 
                        history.push(`/channels/${channel.id}/edit`)
                        }}>
                        <path fill="#8e9297" d="M14 7V9C14 9 12.5867 9 12.5733 9.00667C12.42 9.58667 12.1733 10.1267 11.84 10.6067L12.74 11.5067L11.4933 12.7533L10.5933 11.8533C10.1133 12.1867 9.57334 12.44 8.99334 12.5867V14H6.99334V12.58C6.41334 12.4333 5.87334 12.18 5.39334 11.8467L4.49333 12.7467L3.24667 11.5L4.14667 10.6C3.81333 10.1267 3.56 9.58 3.41333 9H2V7H3.41333C3.56 6.42 3.81333 5.88 4.14667 5.4L3.24667 4.5L4.5 3.24667L5.4 4.14667C5.87334 3.81333 6.42 3.56 7 3.41333V2H9V3.41333C9.58 3.56667 10.12 3.81333 10.6 4.14667L11.5067 3.25333L12.7533 4.5L11.8533 5.4C12.1867 5.87334 12.44 6.42 12.5867 7H14ZM8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"></path>
                    </svg>
                </div>
            </div>}
        </div>
        )

    const [channelCount, setChannelCount] = useState(channelList.length)
    const prevChannelCount = useRef();
    
    useEffect(() => {
        if (sendToEdit) {
            history.push(`/channels/${channelId}/edit`);
        }
    }, [sendToEdit])

    useEffect(() => {
        dispatch(fetchChannels(id))
    },[id, dispatch, sessionUser.id])

    useEffect(() => {
        prevChannelCount.current = channelCount
        dispatch(fetchChannels(id))
    },[id, dispatch, sessionUser.id, channelCount])
    
        
    const handleDropDown = () => {
        if (sessionUser.id === servers[id].ownerId) {setVisibleDrop(!visibleDrop)}
    }
        
    const handleCloseModal = () => {
        setModalOpen(false);
        setChannelName("general");
    }

    const handleOpenModal = () => {
        setModalOpen(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCloseModal()
        // setErrors([]);
        return dispatch(createChannel({server_id: id, name: channelName }))
        .then(() => {setChannelCount(channelCount + 1)})
          .catch(async (res) => {
            let data;
            try {
              data = await res.clone().json();
            } catch {
              data = await res.text(); 
            }
            // if (data?.errors) setErrors(data.errors);
            // else if (data) setErrors([data]);
            // else setErrors([res.statusText]);
          });
      }

    if (servers[id]){
        return(
            <div className="channel-index">
                <div className="server-name-dropdown" onClick={handleDropDown}>
                    <div className="server-name-text">{servers[id].name}</div>
                    <div className="server-name-arr">&#8964;</div>
                </div>
                <Modal modalOpen={modalOpen} modalClose={handleCloseModal}>
                    <div className='create-channel-page'>
                        <button className="create-channel-modal-x" onClick={handleCloseModal}>X</button>
                        <div className="create-channel-text">Create Text Channel</div>
                        <div className="create-channel-secondary-text">Be able to send messages, interact with friends and so much more!</div>
                            <div className="channel-create-form-container">
                                <form className="channel-create-form" onSubmit={handleSubmit}>
                                    <label>SERVER NAME
                                        <input type="text" value={channelName} onChange={e => setChannelName(e.target.value)} />
                                    </label>
                                    <div className="channel-back">
                                        <button className="channel-back-button" onClick={handleCloseModal}>Cancel</button>
                                    </div>
                                    <input type="submit" value="Create" className="new-channel-create-button"/>
                                </form>
                            </div>
                    </div>
                </Modal>
                {visibleDrop ? 
                    <>
                        <div className="server-edit-dropdown-bg" onClick={handleDropDown}></div>
                        <div className="server-edit-dropdown-menu">
                            <div className="server-dropdown-settings" onClick={() => {history.push(`/servers/${id}/edit`)}}>Server Settings
                                <div className='server-dropdown-gear'>
                                    <svg aria-hidden='true' role='img' className="svg-22">
                                        <path className="s-d-g-path" fill="#8e9297" d="M14 7V9C14 9 12.5867 9 12.5733 9.00667C12.42 9.58667 12.1733 10.1267 11.84 10.6067L12.74 11.5067L11.4933 12.7533L10.5933 11.8533C10.1133 12.1867 9.57334 12.44 8.99334 12.5867V14H6.99334V12.58C6.41334 12.4333 5.87334 12.18 5.39334 11.8467L4.49333 12.7467L3.24667 11.5L4.14667 10.6C3.81333 10.1267 3.56 9.58 3.41333 9H2V7H3.41333C3.56 6.42 3.81333 5.88 4.14667 5.4L3.24667 4.5L4.5 3.24667L5.4 4.14667C5.87334 3.81333 6.42 3.56 7 3.41333V2H9V3.41333C9.58 3.56667 10.12 3.81333 10.6 4.14667L11.5067 3.25333L12.7533 4.5L11.8533 5.4C12.1867 5.87334 12.44 6.42 12.5867 7H14ZM8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="server-dropdown-create-channel" onClick={() => {handleOpenModal(); handleDropDown()}}>Create Channel
                                <div className="server-dropdown-create">+</div>
                            </div>
                        </div>
                    </>
                : null
                }
                <div className="channel-category">
                    <div className="channel-category-text">TEXT CHANNELS</div>
                    {sessionUser.id === servers[id].ownerId && <div className="channel-category-create" onClick={handleOpenModal}> 
                        <svg className="svg-22-plus">
                            <polygon className="channel-plus-icon" fill='#96989d' points="15 10 10 10 10 15 8 15 8 10 3 10 3 8 8 8 8 3 10 3 10 8 15 8"></polygon>
                        </svg>
                    </div>}
                </div>
                {channelList}
            </div>
        )
    } else {
        return(
            <div className="channel-index"></div>
        )
    }
}

export default ChannelsIndex;