import * as ActionTypes from '../constants/ActionTypes'

export const logout = () => (dispatch) => {
    dispatch(requestLogout())

    localStorage.removeItem('token')
    localStorage.removeItem('creds')

    dispatch(receiveLogout())
}

export const requestLogout = (creds) => {
    return {
        type: ActionTypes.LOGOUT_REQUEST
    }
}

export const receiveLogout = (res) => {
    return {
        type: ActionTypes.LOGOUT_SUCCESS
    }
}