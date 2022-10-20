import csrfFetch from "./csrf";

const GET_CHANNELS = 'channels/GET_CHANNELS'

const getChannels = channels => {
    return {
        type: GET_CHANNELS,
        payload: channels
    }
}

const GET_CHANNEL = 'channels/GET_CHANNEL'

const getChannel = channel => {
    return {
        type: GET_CHANNEL,
        payload: channel
    }
}

const REMOVE_CHANNEL = 'servers/REOMVE_CHANNEL'

const removeChannel = channelId => {
    return {
        type: REMOVE_CHANNEL,
        payload: channelId
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

export const createChannel = (channel) => async (dispatch) => {
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

export const updateChannel = (newChannel) => async (dispatch) => {
    const {id, name, server_id} = newChannel
    const response = await csrfFetch(`/api/channels/${newChannel.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            channel: newChannel
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    dispatch(getChannel(data.channel));
    return response;
}   


export const deleteChannel = (channelId) => async (dispatch) => {
    await csrfFetch(`/api/channels/${channelId}`, {method: 'DELETE'});
    dispatch(removeChannel(channelId));
}

const channelReducer = (state = {}, action) => {
    Object.freeze(state)
    const nextState = {...state}
    switch (action.type) {
        case GET_CHANNELS:
            return action.payload;
        case GET_CHANNEL:
            return {...state, ...action.payload};
        case REMOVE_CHANNEL:
            delete nextState[action.payload];
            return nextState;
        default:
            return state;
    }
};

export default channelReducer;



