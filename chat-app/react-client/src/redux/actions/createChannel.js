import * as ActionTypes from '../constants/ActionTypes'
import { BASE_URL } from '../../shared/constants'
import { errorObject } from '../utilities/helper'

export const createChannel = (channelInfo) => (dispatch) => {
    dispatch(requestInfo())

    const bearer = 'Bearer ' + localStorage.getItem('token')
    return fetch(BASE_URL + '/channel', {
        method: 'POST',
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(channelInfo)
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
                alert(res.status)
                dispatch(recieveInfo(res))
            }
            else {
                throw errorObject(res)
            }
        })
        .catch(err => dispatch(infoError(err.message)))
}

export const requestInfo = () => {
    return {
        type: ActionTypes.CREATE_CHANNEL_LOADING
    }
}

export const recieveInfo = (response) => {
    return {
        type: ActionTypes.CREATE_CHANNEL_SUCCESS
    }
}

export const infoError = (msg) => {
    return {
        type: ActionTypes.CREATE_CHANNEL_ERROR,
        payload: msg
    }
}