import * as ActionTypes from '../constants/ActionTypes'
import { BASE_URL } from '../../shared/constants'
import { errorObject } from '../utilities/helper'

export const fetchChannel = (channel) => (dispatch) => {
    dispatch(requestInfo(ActionTypes.FETCH_CHANNEL_LOADING))

    const bearer = 'Bearer ' + localStorage.getItem('token')
    return fetch(BASE_URL + '/channel/' + channel, {
        method: 'GET',
        headers: {
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
        .then((res) => {
            if (res.ok) {
                return res
            }
            else {
                throw errorObject(res)
            }
        }, err => { throw err })
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                dispatch(recieveInfo(ActionTypes.FETCH_CHANNEL_SUCCESS, res))
            }
            else {
                throw errorObject(res)
            }
        })
        .catch(err => dispatch(infoError(ActionTypes.FETCH_CHANNEL_ERROR, err.message)))
}

export const postMessage = (channel, message) => (dispatch) => {
    dispatch(requestInfo(ActionTypes.ADD_MESSAGE_LOADING))

    const bearer = 'Bearer ' + localStorage.getItem('token')
    return fetch(BASE_URL + '/channel/' + channel, {
        method: 'POST',
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify({ "message": message })
    })
        .then((res) => {
            if (res.ok) {
                return res
            }
            else {
                throw errorObject(res)
            }
        }, err => { throw err })
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                dispatch(recieveInfo(ActionTypes.ADD_MESSAGE_SUCCESS, res))
            }
            else {
                throw errorObject(res)
            }
        })
        .catch(err => dispatch(infoError(ActionTypes.ADD_MESSAGE_ERROR, err.message)))
}

export const requestInfo = (actionType) => {
    return {
        type: actionType
    }
}

export const recieveInfo = (actionType, res) => {

    return {
        type: actionType,
        payload: res
    }
}

export const infoError = (actionType, msg) => {
    return {
        type: actionType,
        payload: msg
    }
}