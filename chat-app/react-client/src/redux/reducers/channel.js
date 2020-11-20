import * as ActionTypes from '../constants/ActionTypes'
import { DEFAULT_CHANNEL } from '../../shared/constants'

const initState = {
    isLoading: false,
    channel: DEFAULT_CHANNEL,
    errMsg: null
}

export const channel = (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_CHANNEL_LOADING:
            return {
                ...state,
                isLoading: true,
                errMsg: null
            }
        case ActionTypes.FETCH_CHANNEL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                channel: action.payload,
                errMsg: null
            }
        case ActionTypes.FETCH_CHANNEL_ERROR:
            return {
                ...state,
                isLoading: false,
                channel: null,
                errMsg: action.payload
            }
        default:
            return state
    }
}