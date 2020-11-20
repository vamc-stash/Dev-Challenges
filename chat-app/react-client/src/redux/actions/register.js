import * as ActionTypes from '../constants/ActionTypes'
import { BASE_URL } from '../../shared/constants'
import { errorObject } from '../utilities/helper'

export const signup = (creds) => (dispatch) => {
    dispatch(requestSignup(creds))

    return fetch(BASE_URL + '/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(creds),
        credentials: "same-origin"
    })
        .then(res => {
            if (res.ok) {
                return res
            }
            else {
                throw errorObject(res)
            }
        }, err => { throw err })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                dispatch(addToUsers(JSON.stringify(creds)))
            }
            else {
                throw errorObject(res)
            }
        })
        .catch(err => dispatch(signupError(err.message)))
}

export const requestSignup = (creds) => {
    return {
        type: ActionTypes.SIGNUP_REQUEST,
        payload: creds
    }
}

export const addToUsers = (creds) => {
    return {
        type: ActionTypes.SIGNUP_SUCCESS,
        payload: creds
    }
}

export const signupError = (msg) => {
    return {
        type: ActionTypes.SIGNUP_FAILURE,
        payload: msg
    }
}