import axios from "axios";

export const userLogin = user => {
    return dispatch => {
        return axios.post('http://emphasoft-test-assignment.herokuapp.com/api-token-auth/', user)
            .then( response => {
                if (response.data.token) {
                    localStorage.setItem("token", response.data.token);
                    dispatch(loginUser(response.data.token))
                }
            })
            .catch( error => {
                if (error.response && error.response.status === 400) {
                    if (error.response.data.non_field_errors)  dispatch(showMessage({message: 'Не правильно введен логин или пароль', type: 'err'}))
                }
            });
    }
}
// "Nf<U4f<rDbtDxAPn"
const loginUser = obj => ({
    type: 'LOGIN_USER',
    payload: obj
})

export const logout= () => ({
    type: 'LOGOUT_USER'
})

export const getToken = () => {
    return dispatch => {
        const token = localStorage.token;
        if (token) {
            dispatch(loginUser(token))
        }
    }
}

export const showMessage = msgObj => ({
    type: 'MESSAGEBAR_SHOW_MESSAGE',
    payload: msgObj
})

export const hideMessage = obj => ({
    type: 'MESSAGEBAR_HIDE_MESSAGE'
})