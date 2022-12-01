import csrfFetch from "./csrf";

const GET_DMESSAGES = 'dmessages/GET_DMESSAGES'

const getDmessages = dmessages => {
    return {
        type: GET_DMESSAGES,
        payload: dmessages
    }
}

const GET_DMESSAGE = 'dmessages/GET_DMESSAGE'

const getDmessage = dmessage => {
    return {
        type: GET_DMESSAGE,
        payload: dmessage
    }
}

const REMOVE_DMESSAGE = 'dmessages/REMOVE_DMESSAGE'

const removeDmessage = dmessageId => {
    return {
        type: REMOVE_DMESSAGE,
        payload: dmessageId
    }
}

export const fetchDmessages = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/dmessages?chatroomId=${id}`);
    const data = await response.json();
    dispatch(getDmessages(data));
    return response;
}

export const fetchDmessage = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/dmessages/${id}`);
    const data = await response.json();
    dispatch(getDmessage(data));
    return response;
}

export const createDmessage = (dmessage) => async (dispatch) => {
    const {content, author_id, chatroom_id, author_name} = dmessage
    const response = await csrfFetch(`/api/dmessages`, {
        method: 'POST',
        body: JSON.stringify({
            dmessage: dmessage
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    dispatch(getDmessage(data.dmessage));
    return response;
}   

export const updateDmessage = (newDmessage) => async (dispatch) => {
    const {id, content, author_id, chatroom_id, author_name} = newDmessage
    const response = await csrfFetch(`/api/messages/${newDmessage.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            dmessage: newDmessage
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    dispatch(getDmessage(data.dmessage));
    return response;
}   


export const deleteDmessage = (dmessageId) => async (dispatch) => {
    await csrfFetch(`/api/messages/${dmessageId}`, {method: 'DELETE'});
    dispatch(removeDmessage(dmessageId));
}

const dmessageReducer = (state = {}, action) => {
    Object.freeze(state)
    const nextState = {...state}
    switch (action.type) {
        case GET_DMESSAGES:
            return action.payload;
        case GET_DMESSAGE:
            nextState[action.payload.id] = {...action.payload}
            return nextState;
        case REMOVE_DMESSAGE:
            delete nextState[action.payload];
            return nextState;
        default:
            return state;
    }
};

export default dmessageReducer;

