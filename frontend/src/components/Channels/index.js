import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchChannels} from '../../store/channels';
import {fetchServer, fetchServers} from '../../store/servers';
import { Redirect, useParams } from 'react-router-dom';
import './Channels.css'

function ChannelsIndex() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const sessionUser = useSelector(state => state.session.user)
    const channels = useSelector(state => state.channels)
    const servers = useSelector(state => state.servers)
    console.log(servers)
    // const server = useSelector(state => state.servers.server)
    // console.log(servers)
    const channelList = Object.values(channels)
        .map(channel => 
        <div className="channeListItem" key={channel.id + "/channelId"}>
            <h3>{channel.name}</h3>
        </div>
        )

    useEffect(() => {
        dispatch(fetchChannels(id))
        // dispatch(fetchServers(1))
        // dispatch(fetchServer(id))
    },[id, dispatch, sessionUser.id])

    if (servers[id]){
        return(
            <div className="channel-index">
                <div className="server-name-dropdown">
                    <div className="server-name-text">{servers[id].name}</div>
                    <div className="server-name-arr">&#8964;</div>
                </div>
                {channelList}
            </div>
        )
    } else {
        return(
            <div>LOADING</div>
        )
    }
}

export default ChannelsIndex;