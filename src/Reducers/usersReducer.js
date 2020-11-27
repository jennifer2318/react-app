const initialState = {
    users: []
}

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_LIST_USERS':
            return {...state, users: action.payload}
        case 'CLEAR_LIST_USERS':
            return {...state, users: []}
        default:
            return state;
    }
}