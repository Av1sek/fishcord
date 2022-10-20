import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchChannels } from '../../store/channels';
import { fetchServers, deleteServer, updateServer } from '../../store/servers';
import './ServerEditPage.css'

function ServerEditPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)
    const channels = useSelector(state => state.channels)
    const servers = useSelector(state => state.servers)
    const [serverName,setServerName] = useState("null")
    const [serverDisplayName, setServerDisplayName] = useState("null")
    console.log(channels);
    console.log(servers);

    useEffect(() => {
        dispatch(fetchChannels(id))
        dispatch(fetchServers(sessionUser.id))
    }, [id, dispatch, sessionUser.id])

    useEffect(() => {
        if (servers[id]) {
            displayNameMount();
        }
    }, [servers])

    const displayNameMount = () => {
        setServerName(servers[id].name)
        let textArr = servers[id].name.split(" ");
        let firstLetters = textArr.map(word => {
            return word[0]
        })
        setServerDisplayName(firstLetters.join(''))
    }

    const handleNameChange = e => {
        setServerName(e.target.value);
        let textArr = e.target.value.split(" ");
        let firstLetters = textArr.map(word => {
            return word[0]
        })
        setServerDisplayName(firstLetters.join(''))
    }

    const handleDelete = () => {
        dispatch(deleteServer(id))
        history.push(`/servers/1`)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // setErrors([]);
        return dispatch(updateServer({id: id, owner_id: sessionUser.id, name: serverName }))
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

    if (servers[id]) {
        return (
            <div className="server-edit-page">
                <div className="server-name-container">
                    <div className="server-name-edit-text">
                        {serverName.toUpperCase() + "'S SERVER"}
                    </div>
                    <div className="server-sidebar-overview-text">
                        Overview
                    </div>
                    <button className="delete-server-button" onClick={handleDelete}>Delete Server</button>
                </div>
                <div className="server-overview-container">
                    <div className="server-overview-edit-text">
                        Server Overview
                    </div>
                    <div className="server-overview-exit-container" onClick={() => {history.push(`/servers/${id}`)}}>
                        X
                        <div className="server-overview-exit-text">
                            ESC
                        </div>
                    </div>
                    <div className="server-overview-img">
                        {serverDisplayName}
                    </div>
                    <div className="channel-create-form-container">
                        <form className="channel-create-form" onSubmit={handleSubmit}>
                            <label>SERVER NAME
                                <input type="text" value={serverName} onChange={handleNameChange} />
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

export default ServerEditPage