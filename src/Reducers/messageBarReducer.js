const initialState = {
    message: '',
    type: ''
}

export default function messageBarReducer(state = initialState, action) {
    switch (action.type) {
        case 'MESSAGEBAR_SHOW_MESSAGE':
            return {...state, message: action.payload}
        case 'MESSAGEBAR_HIDE_MESSAGE':
            return {...state, message: ''}
        default:
            return state;
    }
}