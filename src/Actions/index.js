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
                    if (error.response.data.non_field_errors) dispatch(showMessage({message: 'Не правильно введен логин или пароль', type: 'err'}))
                }
            });
    }
}

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

export const getUsersFetch = () => {
    return dispatch => {
        const token = localStorage.token;
        if (token) {
            return axios.get('http://emphasoft-test-assignment.herokuapp.com/api/v1/users/', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
                .then( response => {
                    if (response.data) {
                        if (Array.isArray(response.data)) dispatch(setUsers(response.data))
                    }
                })
                .catch( error => {
                    if (error.response && error.response.status === 401) {
                        localStorage.removeItem('token')
                        dispatch(logout())
                        dispatch(showMessage({message: 'Вы не авторизованы', type: 'err'}))
                    }
                });
        }
    }
}

const setUsers = usersArr => ({
    type: 'GET_LIST_USERS',
    payload: usersArr
})

export const clearUsers = () => ({
    type: 'CLEAR_LIST_USERS'
})
