import * as ActionTypes from '../constants/ActionTypes'

const initState = {
    isLoading: false,
    channels: [],
    errMsg: null
}

export const allChannels = (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_ALL_CHANNELS_LOADING:
            return {
                ...state,
                isLoading: true,
                errMsg: null
            }
        case ActionTypes.FETCH_ALL_CHANNELS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                channels: action.payload,
                errMsg: null
            }
        case ActionTypes.FETCH_ALL_CHANNELS_ERROR:
            return {
                ...state,
                isLoading: false,
                channels: [],
                errMsg: action.payload
            }
        default:
            return state
    }
}