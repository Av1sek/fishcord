import csrfFetch from "./csrf";

const GET_SERVERS = 'servers/GET_SERVERS'

const getServers = servers => {
    return {
        type: GET_SERVERS,
        payload: servers
    }
}

export const fetchServers = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/servers?userId=${id}`)
    const data = await response.json();
    console.log(data)
    return dispatch(getServers(data));
}   

const serverReducer = (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case GET_SERVERS:
            return action.payload
        default:
            return state;
    }
};
export default serverReducer;



