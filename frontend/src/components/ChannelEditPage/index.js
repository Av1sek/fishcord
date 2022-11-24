import React, { useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteChannel, fetchChannel, updateChannel } from '../../store/channels';
import './ChannelEditPage.css'

function ChannelEditPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();
    const channel = useSelector(state => state.channels.channel)
    const [newChannelName,setNewChannelName] = useState("null")
    const displayingChannelName = useRef()

    useEffect(() => {
        dispatch(fetchChannel(id))
    }, [])

    useEffect(() => {
        dispatch(fetchChannel(id))
        if (displayingChannelName.current === true) {
            setNewChannelName(channel.name)
        }
    }, [displayingChannelName.current])

    const handleDelete = () => {
        history.push(`/servers/${channel.serverId}/1`)
        dispatch(deleteChannel(id))
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // setErrors([]);
        return dispatch(updateChannel({id: id, server_id: channel.server_id, name: newChannelName }))
          .catch(async (res) => {
            let data;
            try {
              data = await res.clone().json();
            } catch {
            //   data = await res.text(); 
            }
            // if (data?.errors) setErrors(data.errors);
            // else if (data) setErrors([data]);
            // else setErrors([res.statusText]);
          });
      }

    if (channel) {
        displayingChannelName.current = true
        return (
            <div className="server-edit-page">
                <div className="server-name-container">
                    <div className="server-name-edit-text">
                        {newChannelName.toUpperCase() + " CHANNEL"}
                    </div>
                    <div className="server-sidebar-overview-text">
                        Overview
                    </div>
                    <button className="delete-server-button" onClick={handleDelete}>Delete Channel</button>
                </div>
                <div className="server-overview-container">
                    <div className="server-overview-edit-text">
                        Overview
                    </div>
                    <div className="server-overview-exit-container" onClick={() => {history.push(`/servers/${channel.serverId}/1`)}}>
                        X
                        <div className="server-overview-exit-text">
                            ESC
                        </div>
                    </div>
                    <div className="channel-create-form-container">
                        <form className="channel-create-form" onSubmit={handleSubmit}>
                            <label>CHANNEL NAME
                                <input type="text" value={newChannelName} onChange={e => setNewChannelName(e.target.value)} />
                            </label>
                            <input type="submit" value="Save Changes" className="server-edit-button"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="server-name-container">
            </div>
        )
    }
}

export default ChannelEditPage