import csrfFetch from "./csrf";

const GET_SERVERS = 'servers/GET_SERVERS'

const getServers = servers => {
    return {
        type: GET_SERVERS,
        payload: servers
    }
}

const GET_SERVER = 'servers/GET_SERVER'

const getServer = server => {
    return {
        type: GET_SERVER,
        payload: server
    }
}

const REMOVE_SERVER = 'servers/REMOVE_SERVER'

const removeServer = serverId => {
    return {
        type: REMOVE_SERVER,
        payload: serverId
    }
}

export const fetchServers = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/servers?userId=${id}`);
    const data = await response.json();
    dispatch(getServers(data));
    return response;
}   

export const fetchServer = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/servers/${id}`);
    const data = await response.json();
    dispatch(getServer(data));
    return response;
}   

export const createServer = (server) => async (dispatch) => {
    const {name, owner_id} = server
    const response = await csrfFetch('/api/servers', {
        method: 'POST',
        body: JSON.stringify({
            name,
            owner_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    dispatch(getServer(data.server));
    return response;
}   

export const updateServer = (newServer) => async (dispatch) => {
    const {id, name, owner_id} = newServer
    const response = await csrfFetch(`/api/servers/${newServer.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            server: newServer
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    dispatch(getServer(data.server));
    return response;
}   


export const deleteServer = (serverId) => async (dispatch) => {
    await csrfFetch(`/api/servers/${serverId}`, {method: 'DELETE'});
    dispatch(removeServer(serverId));
}

const serverReducer = (state = {}, action) => {
    Object.freeze(state)
    const nextState = {...state}
    switch (action.type) {
        case GET_SERVERS:
            return action.payload
        case GET_SERVER:
            return {...state, ...action.payload}
        case REMOVE_SERVER:
            delete nextState[action.payload]
            return nextState;
        default:
            return state;
    }
};
export default serverReducer;



