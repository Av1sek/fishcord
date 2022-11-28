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

export const fetchMessages = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/messages?chatroomId=${id}`);
    const data = await response.json();
    dispatch(getMessages(data));
    return response;
}

export const fetchMessage = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/messages/${id}`);
    const data = await response.json();
    dispatch(getMessage(data));
    return response;
}

export const createMessage = (message) => async (dispatch) => {
    const {content, author_id, chatroom_id, author_name} = message
    const response = await csrfFetch(`/api/messages`, {
        method: 'POST',
        body: JSON.stringify({
            message: message
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    dispatch(getMessage(data.message));
    return response;
}   

export const updateMessage = (newMessage) => async (dispatch) => {
    const {id, content, author_id, chatroom_id, author_name} = newMessage
    const response = await csrfFetch(`/api/messages/${newMessage.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            message: newMessage
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    dispatch(getMessage(data.message));
    return response;
}   


export const deleteMessage = (messageId) => async (dispatch) => {
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
            nextState[action.payload.id] = {...action.payload}
            return nextState;
        case REMOVE_MESSAGE:
            delete nextState[action.payload];
            return nextState;
        default:
            return state;
    }
};

export default messageReducer;

