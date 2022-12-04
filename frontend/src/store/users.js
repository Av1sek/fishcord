import csrfFetch from "./csrf";

const GET_USERS = 'users/GET_USERS'

const getUsers = users => {
    return {
        type: GET_USERS,
        payload: users
    }
}

const GET_USER = 'users/GET_USER'

const getUser = user => {
    return {
        type: GET_USER,
        payload: user
    }
}

export const fetchUsers = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/users?serverId=${id}`);
    const data = await response.json();
    dispatch(getUsers(data));
    return response;
}

export const fetchUser = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${id}`);
    const data = await response.json();
    dispatch(getUser(data));
    return response;
}

// export const updateMessage = (newMessage) => async (dispatch) => {
//     const {id, content, author_id, chatroom_id} = newMessage
//     const response = await csrfFetch(`/api/messages/${newMessage.id}`, {
//         method: 'PATCH',
//         body: JSON.stringify({
//             message: newMessage
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
//     const data = await response.json();
//     dispatch(getMessage(data.message));
//     return response;
// }   

const userReducer = (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case GET_USERS:
            return action.payload;
        case GET_USER:
            return {...state, ...action.payload};
        default:
            return state;
    }
};

export default userReducer;

