import csrfFetch from "./csrf";

const GET_CHANNELS = 'channels/GET_CHANNELS'

const getChannels = channels => {
    return {
        type: GET_CHANNELS,
        payload: channels
    }
}

export const fetchChannels = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/channels?serverId=${id}`);
    const data = await response.json();
    dispatch(getChannels(data));
    return response;
}

const channelReducer = (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case GET_CHANNELS:
            return action.payload
        default:
            return state;
    }
};

export default channelReducer;



