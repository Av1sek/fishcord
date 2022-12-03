import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchServers, createServer} from '../../store/servers';
import { Redirect, useHistory } from 'react-router-dom';
import Modal from '../../Modal/Modal';

import './Servers.css'

function ServerIndex() {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const servers = useSelector(state => state.servers)
    const serversList = Object.values(servers).map(
        server => 
        <div className="server" key={server.id + "/serverId"}>
            <h3 onClick={() => history.push(`/servers/${server.id}`)}>
                {
                    server.name.split(" ").map(word => { return word[0]}).join(' ')
                }
            </h3>
        </div>
        )
    const [modalOpen, setModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [serverName, setServerName] = useState(sessionUser.username + "'s server")
    const [serverCount, setServerCount] = useState(serversList.length)

    const prevServerCount = useRef();

    useEffect(() => {
        dispatch(fetchServers(sessionUser.id))
    }, [sessionUser.id, dispatch])
    
    useEffect(() => {
        prevServerCount.current = serverCount
        dispatch(fetchServers(sessionUser.id))
    }, [serverCount, sessionUser.id, dispatch])
    

    if (!sessionUser) return <Redirect to="/" />;
 
    const handleNextPage = (e) => {
        setPage(page + 1)
    } 

    const handlePreviousPage = (e) => {
        setPage(page - 1)
    } 
    
    const handleModalClose = () => {
        setModalOpen(false); 
        setPage(1);
        setServerName(sessionUser.username + "'s server")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleModalClose()
        // setErrors([]);
        setModalOpen(false)
        return dispatch(createServer({owner_id: sessionUser.id, name: serverName }))
          .then(() => {setServerCount(serverCount + 1)})
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

    return(
        <div className="server-index-container">
            <div className="server">
                <h3 className="direct-messages" onClick={() => {history.push(`/channels/@me`)}}></h3>
            </div>
            <div className="dm-border"></div>
            {serversList}
            <div className="server">
                <h3 className="add-server" onClick={() => {setModalOpen(true)}}>+</h3>
                <Modal modalOpen={modalOpen} modalClose={handleModalClose}>
                    {page === 1 ? 
                        <div className="create-server-first-page">
                            <button className="create-server-modal-x" onClick={handleModalClose}>X</button>
                            <div className="create-server-text">Create a server</div>
                            <div className="create-server-secondary-text">Your server is where you and your friends hang out. Make yours and start talking.</div>
                            
                            <div className="create-server-btn-container" onClick={handleNextPage}>
                                <div className="own-server-img" onClick={handleNextPage}>
                                </div>
                                <div className="own-server-text" onClick={handleNextPage}>
                                    Create My Own
                                </div>
                                <div className="own-server-arr" onClick={handleNextPage}><span>&#8250;</span></div>
                            </div>

                            <div className="create-server-template-text" >START FROM A TEMPLATE</div>

                            <div className="create-server-btn-container" onClick={handleNextPage}>
                                <div className="gaming-server-img" onClick={handleNextPage}>
                                </div>
                                <div className="own-server-text" onClick={handleNextPage}>
                                    Gaming
                                </div>
                                <div className="own-server-arr" onClick={handleNextPage}><span>&#8250;</span></div>
                            </div>

                            <div className="create-server-btn-container" onClick={handleNextPage}>
                                <div className="school-server-img" onClick={handleNextPage}>
                                </div>
                                <div className="own-server-text" onClick={handleNextPage}>
                                    School Club
                                </div>
                                <div className="own-server-arr" onClick={handleNextPage}><span>&#8250;</span></div>
                            </div>

                            <div className="create-server-btn-container" onClick={handleNextPage}>
                                <div className="study-server-img" onClick={handleNextPage}>
                                </div>
                                <div className="own-server-text" onClick={handleNextPage}>
                                    Study Group
                                </div>
                                <div className="own-server-arr" onClick={handleNextPage}><span>&#8250;</span></div>
                            </div>

                            <div className="join-server-form">
                                <div className="join-server-text">Have an invite already?</div>
                                <button className="join-server-button">Join a Server</button>
                            </div>
                        </div>
                    : null }
                    {page === 2 ? 
                        <div className="create-server-second-page">
                            <button className="create-server-modal-x" onClick={handleModalClose}>X</button>
                            <div className="create-server-text">Tell us more about your server</div>
                            <div className="create-server-secondary-text">In order to help you with your setup, is your server for just a few friends or a larger community?</div>

                            <div className="create-server-btn-container" onClick={handleNextPage}>
                                <div className="for-friends-img" onClick={handleNextPage}>
                                </div>
                                <div className="own-server-text" onClick={handleNextPage}>
                                    For me and my friends
                                </div>
                                <div className="own-server-arr" onClick={handleNextPage}><span>&#8250;</span></div>
                            </div>

                            <div className="create-server-btn-container" onClick={handleNextPage}>
                                <div className="for-club-img" onClick={handleNextPage}>
                                </div>
                                <div className="own-server-text" onClick={handleNextPage}>
                                    For a club or community
                                </div>
                                <div className="own-server-arr" onClick={handleNextPage}><span>&#8250;</span></div>
                            </div>

                            <div className="server-for-text">
                                <div className="grey-text">Not sure? You can&nbsp;</div>
                                <div className="blue-text" onClick={handleNextPage} >skip this question&nbsp;</div>
                                <div className="grey-text">for now </div>
                            </div>

                            <div className="server-back">
                                <button className="server-back-button" onClick={handlePreviousPage}>Back</button>
                            </div>
                        </div>
                    : null }
                    {page === 3 ?
                        <div className='create-server-third-page'>
                            <button className="create-server-modal-x" onClick={handleModalClose}>X</button>
                            <div className="create-server-text">Customize your server</div>
                            <div className="create-server-secondary-text">Give your server a personality with a name. You can always change it later.</div>
                            
                            <div className="server-form-logo-img">
                            </div>

                            <div className="server-create-form-container">
                                <form className="server-create-form" onSubmit={handleSubmit}>
                                    <label>SERVER NAME
                                        <input type="text" value={serverName} onChange={e => setServerName(e.target.value)} />
                                    </label>
                                    <div className="server-back">
                                        <button className="server-back-button" onClick={handlePreviousPage}>Back</button>
                                    </div>
                                    <div className="server-form-text">
                                        <div className="grey-text">By creating a server, you agree that&nbsp;</div>
                                        <div className="blue-text">Fishcord&nbsp;</div>
                                        <div className="grey-text">is just a clone!</div>
                                    </div>
                                    <input type="submit" value="Create" className="new-server-create-button"/>
                                </form>
                            </div>
                        </div>
                    : null}
                </Modal>
            </div>
        </div>
    )
}

export default ServerIndex;