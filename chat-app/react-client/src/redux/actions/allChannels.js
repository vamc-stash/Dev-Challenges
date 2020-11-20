import * as ActionTypes from '../constants/ActionTypes'
import { BASE_URL } from '../../shared/constants'
import { errorObject } from '../utilities/helper'

export const fetchAllChannels = () => (dispatch) => {
    dispatch(requestInfo())

    const bearer = 'Bearer ' + localStorage.getItem('token')
    return fetch(BASE_URL + '/channel', {
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
                dispatch(recieveInfo(res.channels))
            }
            else {
                throw errorObject(res)
            }
        })
        .catch(err => dispatch(infoError(err.message)))
}

export const requestInfo = () => {
    return {
        type: ActionTypes.FETCH_ALL_CHANNELS_LOADING
    }
}

export const recieveInfo = (channels) => {
    return {
        type: ActionTypes.FETCH_ALL_CHANNELS_SUCCESS,
        payload: channels
    }
}

export const infoError = (msg) => {
    return {
        type: ActionTypes.FETCH_ALL_CHANNELS_ERROR,
        payload: msg
    }
}