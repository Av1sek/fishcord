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

export const fetchChannels = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/channels?serverId=${id}`);
    const data = await response.json();
    dispatch(getChannels(data));
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

const channelReducer = (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case GET_CHANNELS:
            return action.payload
        case GET_CHANNEL:
            return {...state, ...action.payload}
        default:
            return state;
    }
};

export default channelReducer;



