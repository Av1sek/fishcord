import csrfFetch from "./csrf";

const GET_MESSAGES = 'messages/GET_MESSAGES'

const getMessages = messages => {
    return {
        type: GET_MESSAGES,
        payload: messages
    }
}

const GET_MESSAGE = 'messages/GET_MESSAGE'

const getMessage = message => {
    return {
        type: GET_MESSAGE,
        payload: message
    }
}

const REMOVE_MESSAGE = 'messages/REMOVE_MESSAGE'

const removeMessage = messageId => {
    return {
        type: REMOVE_MESSAGE,
        payload: messageId
    }
}

export const fetchChannels = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/channels?serverId=${id}`);
    const data = await response.json();
    dispatch(getChannels(data));
    return response;
}

export const fetchChannel = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/channels/${id}`);
    const data = await response.json();
    dispatch(getChannel(data));
    return response;
}

export const createMessage = (message) => async (dispatch) => {
    const {name, server_id} = channel
    const response = await csrfFetch(`/api/channels`, {
        method: 'POST',
        body: JSON.stringify({
            channel: channel
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    dispatch(getChannel(data.channel));
    return response;
}   

// export const updateChannel = (newChannel) => async (dispatch) => {
//     const {id, name, server_id} = newChannel
//     const response = await csrfFetch(`/api/channels/${newChannel.id}`, {
//         method: 'PATCH',
//         body: JSON.stringify({
//             channel: newChannel
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
//     const data = await response.json();
//     dispatch(getChannel(data.channel));
//     return response;
// }   


export const deleteChannel = (messageId) => async (dispatch) => {
    await csrfFetch(`/api/messages/${messageId}`, {method: 'DELETE'});
    dispatch(removeMessage(messageId));
}

const messageReducer = (state = {}, action) => {
    Object.freeze(state)
    const nextState = {...state}
    switch (action.type) {
        case GET_MESSAGES:
            return action.payload;
        case GET_MESSAGE:
            return {...state, ...action.payload};
        case REMOVE_MESSAGE:
            delete nextState[action.payload];
            return nextState;
        default:
            return state;
    }
};

export default messageReducer;

