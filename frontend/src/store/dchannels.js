import csrfFetch from "./csrf";

const GET_DCHANNELS = 'dchannels/GET_DCHANNELS'

const getDchannels = dchannels => {
    return {
        type: GET_DCHANNELS,
        payload: dchannels
    }
}

const GET_DCHANNEL = 'dchannels/GET_DCHANNEL'

const getDchannel = dchannel => {
    return {
        type: GET_DCHANNEL,
        payload: dchannel
    }
}

export const fetchDchannels = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/dchannels?userId=${id}`);
    const data = await response.json();
    dispatch(getDchannels(data));
    return response;
}

export const fetchDchannel = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/channels/${id}`);
    const data = await response.json();
    dispatch(getDchannel(data));
    return response;
}

export const createDchannel = (dchannel) => async (dispatch) => {
    const {user_1_id, user_2_id, user1_name, user2_name} = dchannel
    const response = await csrfFetch(`/api/dchannels`, {
        method: 'POST',
        body: JSON.stringify({
            dchannel: dchannel
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    dispatch(getDchannel(data.channel));
    return response;
}   

const dchannelReducer = (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case GET_DCHANNELS:
            return action.payload;
        case GET_DCHANNEL:
            return {...state, ...action.payload};
        default:
            return state;
    }
};

export default dchannelReducer;



