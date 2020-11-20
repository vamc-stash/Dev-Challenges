import * as ActionTypes from '../constants/ActionTypes'
import { BASE_URL } from '../../shared/constants'
import { errorObject } from '../utilities/helper'

export const login = (creds) => (dispatch) => {
    dispatch(requestLogin(creds))

    return fetch(BASE_URL + '/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
    })
        .then(res => {
            if (res.ok) {
                return res
            }
            else {
                throw errorObject(res)
            }
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                localStorage.setItem('token', res.token)
                localStorage.setItem('creds', JSON.stringify(res))
                console.log('respo', res.user)
                dispatch(receiveLogin(res))
                return res
            }
            else {
                throw errorObject(res)
            }
        })
        .catch(err => dispatch(loginError(err.message)))
}

export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        payload: creds
    }
}

export const receiveLogin = (res) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        payload: res
    }
}

export const loginError = (msg) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        payload: msg
    }
}