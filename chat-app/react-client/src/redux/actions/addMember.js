import * as ActionTypes from '../constants/ActionTypes'
import { BASE_URL } from '../../shared/constants'
import { errorObject, parseJwt } from '../utilities/helper'

export const addMember = () => (dispatch, getState) => {
    const userId = parseJwt(getState().auth.token)?._id
    const { channel } = getState().channel.channel

    for (let member of channel.members) {
        if (userId === member._id) {
            return
        }
        else {
            dispatch(requestInfo())

            const bearer = 'Bearer ' + localStorage.getItem('token')
            return fetch(BASE_URL + '/channel/' + channel.nameRef + '/member', {
                method: 'PUT',
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
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
                        dispatch(recieveInfo(res))
                    }
                    else {
                        throw errorObject(res)
                    }
                })
                .catch(err => dispatch(infoError(err.message)))

        }
    }

}

export const requestInfo = () => {
    return {
        type: ActionTypes.ADD_MEMBER_TO_CHANNEL_LOADING
    }
}

export const recieveInfo = (response) => {
    return {
        type: ActionTypes.ADD_MEMBER_TO_CHANNEL_SUCCESS,
        payload: response
    }
}

export const infoError = (msg) => {
    return {
        type: ActionTypes.ADD_MEMBER_TO_CHANNEL_ERROR,
        payload: msg
    }
}