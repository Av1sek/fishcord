import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchDchannels } from '../../store/dchannels';
import { fetchUser } from '../../store/users';
import './DChannel.css'

function DchannelsIndex() {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const dchannels = useSelector(state => state.dchannels)
    const users = useSelector(state => state.users);
    
    useEffect(() => {
        dispatch(fetchDchannels(sessionUser.id))
    },[])

    const dchannelsList = Object.values(dchannels).map((dchannel) => (
        <div className="dchannel-list-item-container" key={dchannel.id} onClick={() => {history.push(`/channels/@me/${dchannel.id}`)}}>
            <div className="dchannel-list-item-pfp"></div>
            <div className="dchannel-list-item-username">{dchannel.user1Id === sessionUser.id ? dchannel.user2Name : dchannel.user1Name}</div>
        </div>
    ))

    return (
        <div className="dchannel-index">
            <div className="dchannel-category">
                <div className="dchannel-category-text">DIRECT MESSAGES</div>
            </div>
            {dchannelsList}
        </div>
    )
}

export default DchannelsIndex;