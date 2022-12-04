import csrfFetch from "./csrf";

const GET_SERVERMEMBERS = 'server_members/GET_SERVERMEMBERS'

const getServerMembers = serverMembers => {
    return {
        type: GET_SERVERMEMBERS,
        payload: serverMembers
    }
}

const GET_SERVERMEMBER = 'server_members/GET_SERVERMEMBER'

const getServerMember = serverMember => {
    return {
        type: GET_SERVERMEMBER,
        payload: serverMember
    }
}

const REMOVE_SERVERMEMBER = 'server_members/REMOVE_SERVERMEMBER'

const removeServerMember = serverMemberId => {
    return {
        type: REMOVE_SERVERMEMBER,
        payload: serverMemberId
    }
}

export const fetchServerMembers = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/server_members?userId=${id}`);
    const data = await response.json();
    dispatch(getServerMembers(data))
    return response;
}

export const createServerMember = (serverMember) => async (dispatch) => {
    const {id, member_id, server_id} = serverMember
    const response = await csrfFetch('/api/server_members', {
        method: 'POST',
        body: JSON.stringify({
            server_member: serverMember
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    dispatch(getServerMember(data.serverMember));
    return response;
}   

export const deleteServerMember = (serverMemberId) => async (dispatch) => {
    await csrfFetch(`/api/server_members/${serverMemberId}`, {method: 'DELETE'});
    dispatch(removeServerMember(serverMemberId));
}

const serverMemberReducer = (state = {}, action) => {
    Object.freeze(state)
    const nextState = {...state}
    switch (action.type) {
        case GET_SERVERMEMBERS:
            return action.payload
        case GET_SERVERMEMBER:
            return {...state, ...action.payload}
        case REMOVE_SERVERMEMBER:
            delete nextState[action.payload]
            return nextState;
        default:
            return state;
    }
};
export default serverMemberReducer;

