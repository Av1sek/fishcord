import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchServers} from '../../store/servers';
import { Redirect } from 'react-router-dom';
import './Servers.css'

function ServerIndex() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const servers = useSelector(state => state.servers)
    const serversList = Object.values(servers).map(server => <div className="server"><h3>{server.id}</h3></div>)

    useEffect(() => {
        dispatch(fetchServers(sessionUser.id))
    }, [])
    
    if (!sessionUser) return <Redirect to="/" />;
    
    return(
        <div className="server-index-container">
            <div className="server">
                <h3 className="direct-messages"></h3>
            </div>
            <div className="dm-border"></div>
            {serversList}
            <div className="server">
                <h3 className="add-server">+</h3>
            </div>
            <div className="server-show"></div>
            <div className="channel-show"></div>
            <div className="users-show"></div>
        </div>
    )
}

export default ServerIndex;